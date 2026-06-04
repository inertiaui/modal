// Consumer-install smoke test.
//
// Loads the base page in a real (production-built) consumer app and opens a
// modal by navigating with the Inertia router (a ModalLink click, no full page
// reload). A duplicate Inertia/Vue/React copy surfaces as a console error or
// uncaught exception the moment the modal mounts ("usePage must be used within
// the Inertia component" on React, "Cannot convert undefined or null to object"
// on Vue). It also asserts the modal actually rendered and that the open really
// went through the router, so a silently broken bundle still fails.
//
// Usage: node smoke.mjs <base-url>
//        node smoke.mjs http://127.0.0.1:8000

import { chromium } from 'playwright'

const baseUrl = process.argv[2] ?? process.env.SMOKE_URL
if (!baseUrl) {
    console.error('Usage: node smoke.mjs <base-url>')
    process.exit(2)
}

const pageUrl = new URL('/modal-smoke', baseUrl).toString()
const expected = 'Hello from the Inertia Modal smoke test'
const errors = []
let modalRequested = false

const browser = await chromium.launch()
const page = await browser.newPage()

page.on('pageerror', (err) => errors.push(`pageerror: ${err.message}`))
page.on('console', (msg) => {
    if (msg.type() === 'error') {
        errors.push(`console.error: ${msg.text()}`)
    }
})
// The modal is fetched by the Inertia router over XHR. Seeing that request go
// out proves the open was a real client-side navigation to the modal route, not
// a purely local state toggle.
page.on('request', (req) => {
    if (/\/modal-smoke\/greet\b/.test(req.url())) {
        modalRequested = true
    }
})

function fail(message) {
    console.error(`SMOKE FAIL: ${message}`)
    if (errors.length) {
        console.error('Captured browser errors:')
        for (const e of errors) console.error(`  - ${e}`)
    }
}

try {
    await page.goto(pageUrl, { waitUntil: 'networkidle' })
    await page.waitForSelector('[data-testid="open-modal"]', { timeout: 10_000 })

    // Tag the live document. An Inertia client-side navigation keeps this flag;
    // a full page reload wipes it. Lets us prove the modal opened via the router
    // rather than a hard navigation that would mask a broken SPA setup.
    await page.evaluate(() => {
        window.__noReload = true
    })

    // Open the modal by navigating with the Inertia router (ModalLink click).
    await page.click('[data-testid="open-modal"]')
    await page.waitForSelector('[data-testid="modal-message"]', { timeout: 10_000 })

    const message = (await page.textContent('[data-testid="modal-message"]'))?.trim()
    const survivedReload = await page.evaluate(() => window.__noReload === true)

    if (errors.length) {
        fail(`${errors.length} browser error(s) detected`)
        process.exitCode = 1
    } else if (!survivedReload) {
        fail('modal opened via a full page reload, not the Inertia router')
        process.exitCode = 1
    } else if (!modalRequested) {
        fail('no XHR to the modal route — the open did not go through the Inertia router')
        process.exitCode = 1
    } else if (message !== expected) {
        fail(`modal content did not render (got: ${JSON.stringify(message)})`)
        process.exitCode = 1
    } else {
        console.log('SMOKE PASS: modal opened via the Inertia router, content rendered, no browser errors')
    }
} catch (err) {
    fail(err.message)
    process.exitCode = 1
} finally {
    await browser.close()
}

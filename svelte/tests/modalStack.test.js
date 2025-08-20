import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useModalStack, modalPropNames, initFromPageProps } from '../src/lib/modalStack.svelte.js'
import axios from 'axios'
import { router } from '@inertiajs/svelte'
import { generateIdUsing } from '../src/lib/helpers'

vi.mock('@inertiajs/svelte', () => ({
    router: {
        resolveComponent: vi.fn(),
    }
}))

vi.mock('axios')

describe('modalStack', () => {
    let modalStack

    beforeEach(() => {
        modalStack = useModalStack()
        vi.clearAllMocks()
    })

    afterEach(() => {
        modalStack.reset()
    })

    describe('useModalStack', () => {
        it('should return an object with stack, push, and reset', () => {
            expect(modalStack).toHaveProperty('stack')
            expect(modalStack).toHaveProperty('push')
            expect(modalStack).toHaveProperty('reset')
        })

        it('should have an empty stack initially', () => {
            expect(modalStack.stack).toHaveLength(0)
        })
    })

    describe('Modal', () => {
        it('should create a new modal and add it to the stack', () => {
            const component = { name: 'TestComponent' }
            const response = { props: {}, url: '/test', component: 'TestComponent', version: '1' }
            const config = { closeButton: true }
            const onClose = vi.fn()
            const afterLeave = vi.fn()

            const modal = modalStack.push(component, response, config, onClose, afterLeave)

            expect(modalStack.stack).toHaveLength(1)
            expect(modal).toHaveProperty('id')
            expect(modal.component).toBe(component)
            expect(modal.config).toBe(config)
        })

        it('should generate unique ids for each modal', () => {
            const modal1 = modalStack.push({}, {}, {})
            const modal2 = modalStack.push({}, {}, {})

            expect(modal1.id).not.toBe(modal2.id)
        })

        it('should correctly identify previous and next modals', () => {
            const modal1 = modalStack.push({}, {}, {})
            modal1.show()
            const modal2 = modalStack.push({}, {}, {})
            modal2.show()
            const modal3 = modalStack.push({}, {}, {})
            modal3.show()

            expect(modal1.getParentModal()).toBeNull()
            expect(modal1.getChildModal().id).toBe(modal2.id)

            expect(modal2.getParentModal().id).toBe(modal1.id)
            expect(modal2.getChildModal().id).toBe(modal3.id)

            expect(modal3.getParentModal().id).toBe(modal2.id)
            expect(modal3.getChildModal()).toBeNull()
        })

        it('should correctly determine if a modal is on top of the stack', () => {
            const modal1 = modalStack.push({}, {}, {})
            expect(modal1.onTopOfStack).toBe(true)

            const modal2 = modalStack.push({}, {}, {})
            modal2.show()
            expect(modal1.onTopOfStack).toBe(false)
            expect(modal2.onTopOfStack).toBe(true)

            const modal3 = modalStack.push({}, {}, {})
            modal3.show()
            expect(modal1.onTopOfStack).toBe(false)
            expect(modal2.onTopOfStack).toBe(false)
            expect(modal3.onTopOfStack).toBe(true)
        })

        it('should close a modal', () => {
            const onClose = vi.fn()
            const modal = modalStack.push({}, {}, {}, onClose)
            modal.show() // can't close a modal that is not open
            modal.close()

            expect(modal.isOpen).toBe(false)
            expect(onClose).toHaveBeenCalled()
            // it does not remove the modal from the stack immediately
            expect(modalStack.stack).toHaveLength(1)
        })

        it('should remove a modal after leave', () => {
            const afterLeave = vi.fn()
            const modal = modalStack.push({}, {}, {}, () => {}, afterLeave)
            modal.afterLeave()

            expect(afterLeave).toHaveBeenCalled()
            expect(modalStack.stack).toHaveLength(0)
        })

        it('should handle event listeners', () => {
            const modal = modalStack.push({}, {}, {})
            const callback = vi.fn()

            modal.on('test', callback)
            modal.emit('test', 'arg')

            expect(callback).toHaveBeenCalledWith('arg')

            modal.off('test', callback)
            modal.emit('test', 'arg')

            expect(callback).toHaveBeenCalledTimes(1)
        })

        it('should reload modal props with correct headers', async () => {
            generateIdUsing(() => 'inertiaui_modal_uuid')

            const response = {
                props: { test: 'initial', another: 'prop' },
                url: '/test',
                component: 'TestComponent',
                version: '1',
            }
            const modal = modalStack.push({}, response, {})

            vi.mocked(axios).mockResolvedValue({
                data: { props: { test: 'updated', another: 'updated prop' } },
            })

            await modal.reload()

            expect(axios).toHaveBeenCalledWith({
                method: 'get',
                url: '/test',
                data: {},
                params: {},
                headers: {
                    Accept: 'text/html, application/xhtml+xml',
                    'X-Inertia': true,
                    'X-Inertia-Partial-Component': 'TestComponent',
                    'X-Inertia-Version': '1',
                    'X-Inertia-Partial-Data': 'test,another',
                    'X-InertiaUI-Modal': 'inertiaui_modal_uuid',
                    'X-InertiaUI-Modal-Use-Router': 0,
                    'X-InertiaUI-Modal-Base-Url': null,
                },
            })

            expect(modal.props.test).toBe('updated')
            expect(modal.props.another).toBe('updated prop')
        })

        it('should reload modal props with "only" option', async () => {
            generateIdUsing(() => 'inertiaui_modal_uuid')

            const response = {
                props: { test: 'initial', another: 'prop' },
                url: '/test',
                component: 'TestComponent',
                version: '1',
            }
            const modal = modalStack.push({}, response, {})

            vi.mocked(axios).mockResolvedValue({
                data: { props: { test: 'updated' } },
            })

            await modal.reload({ only: ['test'] })

            expect(axios).toHaveBeenCalledWith({
                method: 'get',
                url: '/test',
                data: {},
                params: {},
                headers: {
                    Accept: 'text/html, application/xhtml+xml',
                    'X-Inertia': true,
                    'X-Inertia-Partial-Component': 'TestComponent',
                    'X-Inertia-Version': '1',
                    'X-Inertia-Partial-Data': 'test',
                    'X-InertiaUI-Modal': 'inertiaui_modal_uuid',
                    'X-InertiaUI-Modal-Use-Router': 0,
                    'X-InertiaUI-Modal-Base-Url': null,
                },
            })

            expect(modal.props.test).toBe('updated')
            expect(modal.props.another).toBe('prop') // This should not change
        })

        it('should reload modal props with "except" option', async () => {
            generateIdUsing(() => 'inertiaui_modal_uuid')

            const response = {
                props: { test: 'initial', another: 'prop', third: 'value' },
                url: '/test',
                component: 'TestComponent',
                version: '1',
            }
            const modal = modalStack.push({}, response, {})

            vi.mocked(axios).mockResolvedValue({
                data: { props: { test: 'updated', third: 'updated value' } },
            })

            await modal.reload({ except: ['another'] })

            expect(axios).toHaveBeenCalledWith({
                method: 'get',
                url: '/test',
                data: {},
                params: {},
                headers: {
                    Accept: 'text/html, application/xhtml+xml',
                    'X-Inertia': true,
                    'X-Inertia-Partial-Component': 'TestComponent',
                    'X-Inertia-Version': '1',
                    'X-Inertia-Partial-Data': 'test,third',
                    'X-InertiaUI-Modal': 'inertiaui_modal_uuid',
                    'X-InertiaUI-Modal-Use-Router': 0,
                    'X-InertiaUI-Modal-Base-Url': null,
                },
            })

            expect(modal.props.test).toBe('updated')
            expect(modal.props.another).toBe('prop') // This should not change
            expect(modal.props.third).toBe('updated value')
        })

        it('should make an Axios request and push a new modal', async () => {
            generateIdUsing(() => 'inertiaui_modal_uuid')

            const href = '/test-url'
            const method = 'get'
            const data = { key: 'value' }
            const headers = { 'Custom-Header': 'Test' }
            const config = { closeButton: true }
            const onClose = vi.fn()
            const onAfterLeave = vi.fn()

            const mockResponse = {
                data: {
                    component: 'TestComponent',
                    props: { testProp: 'value' },
                    url: '/test-url',
                    version: '1',
                },
            }

            const mockComponent = { name: 'TestComponent' }

            modalStack.setComponentResolver((component) => {
                expect(component).toBe('TestComponent')
                return router.resolveComponent(component)
            })

            vi.mocked(axios).mockResolvedValue(mockResponse)
            vi.mocked(router.resolveComponent).mockResolvedValue(mockComponent)
            initFromPageProps({ initialPage: { version: '1.0' } })

            console.log('visiting')
            const result = await modalStack.visit(href, method, data, headers, config, onClose, onAfterLeave)

            expect(axios).toHaveBeenCalledWith({
                url: '/test-url?key=value',
                method: 'get',
                data: {},
                headers: {
                    'Custom-Header': 'Test',
                    Accept: 'text/html, application/xhtml+xml',
                    'X-Requested-With': 'XMLHttpRequest',
                    'X-Inertia': true,
                    'X-Inertia-Version': '1.0',
                    'X-InertiaUI-Modal': 'inertiaui_modal_uuid',
                    'X-InertiaUI-Modal-Use-Router': 0,
                    'X-InertiaUI-Modal-Base-Url': 'http://localhost:3000/',
                },
            })

            expect(result).toBeDefined()
            expect(result.component).toBe(mockComponent)
            expect(result.response).toEqual(mockResponse.data)
            expect(result.config).toEqual(config)
            expect(modalStack.stack).toHaveLength(1)
        })

        it('should handle errors during the visit', async () => {
            const href = '/test-url'
            const method = 'get'

            const mockError = new Error('Network Error')
            vi.mocked(axios).mockRejectedValue(mockError)

            await expect(modalStack.visit(href, method)).rejects.toThrow('Network Error')
            expect(modalStack.stack).toHaveLength(0)
        })
    })

    describe('modalPropNames', () => {
        it('should contain the correct prop names', () => {
            expect(modalPropNames).toEqual(['closeButton', 'closeExplicitly', 'maxWidth', 'paddingClasses', 'panelClasses', 'position', 'slideover'])
        })
    })
})

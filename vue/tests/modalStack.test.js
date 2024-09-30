import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useModalStack, modalPropNames } from './../src/modalStack'
import axios from 'axios'
import { usePage, router } from '@inertiajs/vue3'

vi.mock('@inertiajs/vue3', () => ({
    router: {
        resolveComponent: vi.fn(),
    },
    usePage: vi.fn(),
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
            expect(modalStack.stack.value).toHaveLength(0)
        })
    })

    describe('Modal', () => {
        it('should create a new modal and add it to the stack', () => {
            const component = { name: 'TestComponent' }
            const response = { props: {}, url: '/test', component: 'TestComponent', version: '1' }
            const modalProps = { closeButton: true }
            const onClose = vi.fn()
            const afterLeave = vi.fn()

            const modal = modalStack.push(component, response, modalProps, onClose, afterLeave)

            expect(modalStack.stack.value).toHaveLength(1)
            expect(modal).toHaveProperty('id')
            expect(modal.component).toBe(component)
            expect(modal.modalProps).toBe(modalProps)
        })

        it('should generate unique ids for each modal', () => {
            const modal1 = modalStack.push({}, {}, {})
            const modal2 = modalStack.push({}, {}, {})

            expect(modal1.id).not.toBe(modal2.id)
        })

        it('should correctly identify previous and next modals', () => {
            const modal1 = modalStack.push({}, {}, {})
            const modal2 = modalStack.push({}, {}, {})
            const modal3 = modalStack.push({}, {}, {})

            expect(modal1.getParentModal()).toBeNull()
            expect(modal1.getChildModal().id).toBe(modal2.id)

            expect(modal2.getParentModal().id).toBe(modal1.id)
            expect(modal2.getChildModal().id).toBe(modal3.id)

            expect(modal3.getParentModal().id).toBe(modal2.id)
            expect(modal3.getChildModal()).toBeNull()
        })

        it('should correctly determine if a modal is on top of the stack', () => {
            const modal1 = modalStack.push({}, {}, {})
            expect(modal1.isOnTopOfStack()).toBe(true)

            const modal2 = modalStack.push({}, {}, {})
            expect(modal1.isOnTopOfStack()).toBe(false)
            expect(modal2.isOnTopOfStack()).toBe(true)

            const modal3 = modalStack.push({}, {}, {})
            expect(modal1.isOnTopOfStack()).toBe(false)
            expect(modal2.isOnTopOfStack()).toBe(false)
            expect(modal3.isOnTopOfStack()).toBe(true)
        })

        it('should close a modal', () => {
            const onClose = vi.fn()
            const modal = modalStack.push({}, {}, {}, onClose)
            modal.close()

            expect(modal.open).toBe(false)
            expect(onClose).toHaveBeenCalled()
            // it does not remove the modal from the stack immediately
            expect(modalStack.stack.value).toHaveLength(1)
        })

        it('should remove a modal after leave', () => {
            const afterLeave = vi.fn()
            const modal = modalStack.push({}, {}, {}, () => {}, afterLeave)
            modal.afterLeave()

            expect(afterLeave).toHaveBeenCalled()
            expect(modalStack.stack.value).toHaveLength(0)
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
            const response = {
                props: { test: 'initial', another: 'prop' },
                url: '/test',
                component: 'TestComponent',
                version: '1',
            }
            const modal = modalStack.push({}, response, {})

            vi.mocked(axios.get).mockResolvedValue({
                data: { props: { test: 'updated', another: 'updated prop' } },
            })

            await modal.reload()

            expect(axios.get).toHaveBeenCalledWith('/test', {
                headers: {
                    Accept: 'text/html, application/xhtml+xml',
                    'X-Inertia': true,
                    'X-Inertia-Partial-Component': 'TestComponent',
                    'X-Inertia-Version': '1',
                    'X-Inertia-Partial-Data': 'test,another',
                },
            })

            expect(modal.componentProps.value.test).toBe('updated')
            expect(modal.componentProps.value.another).toBe('updated prop')
        })

        it('should reload modal props with "only" option', async () => {
            const response = {
                props: { test: 'initial', another: 'prop' },
                url: '/test',
                component: 'TestComponent',
                version: '1',
            }
            const modal = modalStack.push({}, response, {})

            vi.mocked(axios.get).mockResolvedValue({
                data: { props: { test: 'updated' } },
            })

            await modal.reload({ only: ['test'] })

            expect(axios.get).toHaveBeenCalledWith('/test', {
                headers: {
                    Accept: 'text/html, application/xhtml+xml',
                    'X-Inertia': true,
                    'X-Inertia-Partial-Component': 'TestComponent',
                    'X-Inertia-Version': '1',
                    'X-Inertia-Partial-Data': 'test',
                },
            })

            expect(modal.componentProps.value.test).toBe('updated')
            expect(modal.componentProps.value.another).toBe('prop') // This should not change
        })

        it('should reload modal props with "except" option', async () => {
            const response = {
                props: { test: 'initial', another: 'prop', third: 'value' },
                url: '/test',
                component: 'TestComponent',
                version: '1',
            }
            const modal = modalStack.push({}, response, {})

            vi.mocked(axios.get).mockResolvedValue({
                data: { props: { test: 'updated', third: 'updated value' } },
            })

            await modal.reload({ except: ['another'] })

            expect(axios.get).toHaveBeenCalledWith('/test', {
                headers: {
                    Accept: 'text/html, application/xhtml+xml',
                    'X-Inertia': true,
                    'X-Inertia-Partial-Component': 'TestComponent',
                    'X-Inertia-Version': '1',
                    'X-Inertia-Partial-Data': 'test,third',
                },
            })

            expect(modal.componentProps.value.test).toBe('updated')
            expect(modal.componentProps.value.another).toBe('prop') // This should not change
            expect(modal.componentProps.value.third).toBe('updated value')
        })

        it('should make an Axios request and push a new modal', async () => {
            const href = '/test-url'
            const method = 'get'
            const data = { key: 'value' }
            const headers = { 'Custom-Header': 'Test' }
            const modalProps = { closeButton: true }
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

            vi.mocked(axios).mockResolvedValue(mockResponse)
            vi.mocked(router.resolveComponent).mockResolvedValue(mockComponent)
            vi.mocked(usePage).mockReturnValue({ version: '1.0' })

            const result = await modalStack.visit(href, method, data, headers, modalProps, onClose, onAfterLeave)

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
                    'X-InertiaUI-Modal': true,
                },
            })

            expect(router.resolveComponent).toHaveBeenCalledWith('TestComponent')

            expect(result).toBeDefined()
            expect(result.component).toBe(mockComponent)
            expect(result.response).toEqual(mockResponse.data)
            expect(result.modalProps).toEqual(modalProps)
            expect(modalStack.stack.value).toHaveLength(1)
        })

        it('should handle errors during the visit', async () => {
            const href = '/test-url'
            const method = 'get'

            const mockError = new Error('Network Error')
            vi.mocked(axios).mockRejectedValue(mockError)

            await expect(modalStack.visit(href, method)).rejects.toThrow('Network Error')
            expect(modalStack.stack.value).toHaveLength(0)
        })
    })

    describe('modalPropNames', () => {
        it('should contain the correct prop names', () => {
            expect(modalPropNames).toEqual(['closeButton', 'closeExplicitly', 'maxWidth', 'paddingClasses', 'panelClasses', 'position', 'slideover'])
        })
    })
})

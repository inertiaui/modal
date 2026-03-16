import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, act, waitFor } from '@testing-library/react'
import { ModalStackProvider, useModalStack, modalPropNames, initFromPageProps } from '../src/ModalRoot'
import axios from 'axios'
import { router } from '@inertiajs/react'
import { usePage } from '@inertiajs/react'
import { generateIdUsing } from '../src/helpers'

vi.mock('@inertiajs/react', () => ({
    router: {
        resolveComponent: vi.fn(),
        push: vi.fn(),
    },
    usePage: vi.fn(),
    progress: {
        start: vi.fn(),
        finish: vi.fn(),
    },
}))

vi.mock('axios')

const wrapper = ({ children }) => <ModalStackProvider>{children}</ModalStackProvider>

describe('modalStack', () => {
    let modalStack

    beforeEach(() => {
        const { result } = renderHook(() => useModalStack(), { wrapper })
        modalStack = result.current
        vi.clearAllMocks()
    })

    afterEach(() => {
        act(() => {
            modalStack.reset()
        })
        generateIdUsing(null)
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
            const { result } = renderHook(() => useModalStack(), { wrapper })

            const component = { name: 'TestComponent' }
            const response = { props: {}, url: '/test', component: 'TestComponent', version: '1' }
            const config = { closeButton: true }
            const onClose = vi.fn()
            const afterLeave = vi.fn()

            let modal
            act(() => {
                modal = result.current.push(component, response, config, onClose, afterLeave)
            })

            expect(result.current.stack).toHaveLength(1)
            expect(modal).toHaveProperty('id')
            expect(modal.component).toBe(component)
            expect(modal.config).toBe(config)
        })

        it('should generate unique ids for each modal', () => {
            const { result } = renderHook(() => useModalStack(), { wrapper })

            let modal1, modal2
            act(() => {
                modal1 = result.current.push({}, {}, {})
                modal2 = result.current.push({}, {}, {})
            })

            expect(modal1.id).not.toBe(modal2.id)
        })

        it('should correctly identify previous and next modals', () => {
            const { result } = renderHook(() => useModalStack(), { wrapper })

            let modal1, modal2, modal3
            act(() => {
                modal1 = result.current.push({}, {}, {})
                modal2 = result.current.push({}, {}, {})
                modal3 = result.current.push({}, {}, {})
            })

            expect(modal1.getParentModal()).toBeNull()
            expect(modal1.getChildModal().id).toBe(modal2.id)

            expect(modal2.getParentModal().id).toBe(modal1.id)
            expect(modal2.getChildModal().id).toBe(modal3.id)

            expect(modal3.getParentModal().id).toBe(modal2.id)
            expect(modal3.getChildModal()).toBeNull()
        })

        it('should correctly determine if a modal is on top of the stack', () => {
            const { result } = renderHook(() => useModalStack(), { wrapper })

            let modal1, modal2, modal3
            act(() => {
                modal1 = result.current.push({}, {}, {})
            })
            expect(modal1.onTopOfStack).toBe(true)

            act(() => {
                modal2 = result.current.push({}, {}, {})
            })
            // After push, the stack is recalculated
            expect(result.current.stack[0].onTopOfStack).toBe(false)
            expect(result.current.stack[1].onTopOfStack).toBe(true)

            act(() => {
                modal3 = result.current.push({}, {}, {})
            })
            expect(result.current.stack[0].onTopOfStack).toBe(false)
            expect(result.current.stack[1].onTopOfStack).toBe(false)
            expect(result.current.stack[2].onTopOfStack).toBe(true)
        })

        it('should close a modal', () => {
            const { result } = renderHook(() => useModalStack(), { wrapper })

            const onClose = vi.fn()
            let modal
            act(() => {
                modal = result.current.push({}, {}, {}, onClose)
            })

            act(() => {
                modal.close()
            })

            expect(result.current.stack[0].isOpen).toBe(false)
            expect(onClose).toHaveBeenCalled()
            // it does not remove the modal from the stack immediately
            expect(result.current.stack).toHaveLength(1)
        })

        it('should remove a modal after leave', () => {
            const { result } = renderHook(() => useModalStack(), { wrapper })

            const afterLeave = vi.fn()
            let modal
            act(() => {
                modal = result.current.push({}, {}, {}, () => {}, afterLeave)
            })

            // Close the modal first
            act(() => {
                modal.close()
            })

            // Then trigger afterLeave
            act(() => {
                modal.afterLeave()
            })

            expect(afterLeave).toHaveBeenCalled()
            expect(result.current.stack).toHaveLength(0)
        })

        it('should handle event listeners', () => {
            const { result } = renderHook(() => useModalStack(), { wrapper })

            let modal
            act(() => {
                modal = result.current.push({}, {}, {})
            })

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

            const { result } = renderHook(() => useModalStack(), { wrapper })

            const response = {
                props: { test: 'initial', another: 'prop' },
                url: '/test',
                component: 'TestComponent',
                version: '1',
            }

            let modal
            act(() => {
                modal = result.current.push({}, response, {})
            })

            vi.mocked(axios).mockResolvedValue({
                data: { props: { test: 'updated', another: 'updated prop' } },
            })

            await act(async () => {
                modal.reload()
            })

            expect(axios).toHaveBeenCalledWith({
                method: 'get',
                url: '/test',
                data: {},
                params: {},
                headers: {
                    Accept: 'text/html, application/xhtml+xml',
                    'X-Inertia': 'true',
                    'X-Inertia-Partial-Component': 'TestComponent',
                    'X-Inertia-Version': '1',
                    'X-Inertia-Partial-Data': 'test,another',
                    'X-InertiaUI-Modal': 'inertiaui_modal_uuid',
                    'X-InertiaUI-Modal-Base-Url': '',
                },
            })

            expect(result.current.stack[0].props.test).toBe('updated')
            expect(result.current.stack[0].props.another).toBe('updated prop')
        })

        it('should reload modal props with "only" option', async () => {
            generateIdUsing(() => 'inertiaui_modal_uuid')

            const { result } = renderHook(() => useModalStack(), { wrapper })

            const response = {
                props: { test: 'initial', another: 'prop' },
                url: '/test',
                component: 'TestComponent',
                version: '1',
            }

            let modal
            act(() => {
                modal = result.current.push({}, response, {})
            })

            vi.mocked(axios).mockResolvedValue({
                data: { props: { test: 'updated' } },
            })

            await act(async () => {
                modal.reload({ only: ['test'] })
            })

            expect(axios).toHaveBeenCalledWith({
                method: 'get',
                url: '/test',
                data: {},
                params: {},
                headers: {
                    Accept: 'text/html, application/xhtml+xml',
                    'X-Inertia': 'true',
                    'X-Inertia-Partial-Component': 'TestComponent',
                    'X-Inertia-Version': '1',
                    'X-Inertia-Partial-Data': 'test',
                    'X-InertiaUI-Modal': 'inertiaui_modal_uuid',
                    'X-InertiaUI-Modal-Base-Url': '',
                },
            })

            expect(result.current.stack[0].props.test).toBe('updated')
            expect(result.current.stack[0].props.another).toBe('prop') // This should not change
        })

        it('should reload modal props with "except" option', async () => {
            generateIdUsing(() => 'inertiaui_modal_uuid')

            const { result } = renderHook(() => useModalStack(), { wrapper })

            const response = {
                props: { test: 'initial', another: 'prop', third: 'value' },
                url: '/test',
                component: 'TestComponent',
                version: '1',
            }

            let modal
            act(() => {
                modal = result.current.push({}, response, {})
            })

            vi.mocked(axios).mockResolvedValue({
                data: { props: { test: 'updated', third: 'updated value' } },
            })

            await act(async () => {
                modal.reload({ except: ['another'] })
            })

            expect(axios).toHaveBeenCalledWith({
                method: 'get',
                url: '/test',
                data: {},
                params: {},
                headers: {
                    Accept: 'text/html, application/xhtml+xml',
                    'X-Inertia': 'true',
                    'X-Inertia-Partial-Component': 'TestComponent',
                    'X-Inertia-Version': '1',
                    'X-Inertia-Partial-Data': 'test,third',
                    'X-InertiaUI-Modal': 'inertiaui_modal_uuid',
                    'X-InertiaUI-Modal-Base-Url': '',
                },
            })

            expect(result.current.stack[0].props.test).toBe('updated')
            expect(result.current.stack[0].props.another).toBe('prop') // This should not change
            expect(result.current.stack[0].props.third).toBe('updated value')
        })

        it('should make an Axios request and push a new modal', async () => {
            generateIdUsing(() => 'inertiaui_modal_uuid')

            const mockComponent = { name: 'TestComponent' }

            // Set up the component resolver before rendering the hook
            initFromPageProps({
                initialPage: { version: '1.0' },
                resolveComponent: (name) => {
                    expect(name).toBe('TestComponent')
                    return Promise.resolve(mockComponent)
                },
            })

            const { result } = renderHook(() => useModalStack(), { wrapper })

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

            vi.mocked(axios).mockResolvedValue(mockResponse)

            let modal
            await act(async () => {
                modal = await result.current.visit(href, method, data, headers, config, onClose, onAfterLeave)
            })

            // For GET requests, data is merged into URL query params, body is empty
            expect(axios).toHaveBeenCalledWith({
                url: '/test-url?key=value',
                method: 'get',
                data: {},
                headers: {
                    'Custom-Header': 'Test',
                    Accept: 'text/html, application/xhtml+xml',
                    'X-Requested-With': 'XMLHttpRequest',
                    'X-Inertia': 'true',
                    'X-Inertia-Version': '1.0',
                    'X-InertiaUI-Modal': 'inertiaui_modal_uuid',
                    'X-InertiaUI-Modal-Base-Url': expect.any(String),
                },
            })

            expect(modal).toBeDefined()
            expect(modal.component).toBe(mockComponent)
            expect(modal.response).toEqual(mockResponse.data)
            expect(modal.config).toEqual(config)
            expect(result.current.stack).toHaveLength(1)
        })

        it('should handle errors during the visit', async () => {
            const { result } = renderHook(() => useModalStack(), { wrapper })

            const href = '/test-url'
            const method = 'get'

            const mockError = new Error('Network Error')
            vi.mocked(axios).mockRejectedValue(mockError)

            await expect(
                act(async () => {
                    await result.current.visit(href, method)
                }),
            ).rejects.toThrow('Network Error')

            expect(result.current.stack).toHaveLength(0)
        })
    })

    describe('modalPropNames', () => {
        it('should contain the correct prop names', () => {
            expect(modalPropNames).toEqual([
                'closeButton',
                'closeExplicitly',
                'closeOnClickOutside',
                'maxWidth',
                'paddingClasses',
                'panelClasses',
                'position',
                'slideover',
            ])
        })
    })
})

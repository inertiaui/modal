# Changelog

All notable changes to `inertiaui/modal` will be documented in this file.

## 0.13.0 - 2024-11-19

### What's Changed

* Custom app mounting by @pascalbaljet in https://github.com/inertiaui/modal/pull/56

**Full Changelog**: https://github.com/inertiaui/modal/compare/0.12.1...0.13.0

## 0.12.1 - 2024-11-19

* Allow Inertia v2 as dev dependency (see #46)

**Full Changelog**: https://github.com/inertiaui/modal/compare/0.12.0...0.12.1

## 0.12.0 - 2024-11-19

### What's Changed

* Prevent double cookie encryption (see #20) by @pascalbaljet in https://github.com/inertiaui/modal/pull/55

**Full Changelog**: https://github.com/inertiaui/modal/compare/0.11.1...0.12.0

## 0.11.1 - 2024-11-06

**Full Changelog**: https://github.com/inertiaui/modal/compare/0.11.0...0.11.1

## 0.11.0 - 2024-11-06

### What's Changed

* Improve GitHub build by @pascalbaljet in https://github.com/inertiaui/modal/pull/48

**Full Changelog**: https://github.com/inertiaui/modal/compare/0.10.0...0.11.0

## 0.10.0 - 2024-11-06

### What's Changed

* Introduced `DuskModalMacros` for better testing by @pascalbaljet in https://github.com/inertiaui/modal/pull/47

**Full Changelog**: https://github.com/inertiaui/modal/compare/0.9.1...0.10.0

## 0.9.1 - 2024-11-03

* Support callable in `ModalVisit::config()`

**Full Changelog**: https://github.com/inertiaui/modal/compare/0.9.0...0.9.1

## 0.9.0 - 2024-11-03

* Introduced `ModalVisit` class

**Full Changelog**: https://github.com/inertiaui/modal/compare/0.8.0...0.9.0

## 0.8.0 - 2024-11-02

* Added `ModalConfig` class

**Full Changelog**: https://github.com/inertiaui/modal/compare/0.7.0...0.8.0

## 0.7.0 - 2024-10-31

### What's Changed

* Listen for events using `visitModal()` by @pascalbaljet in https://github.com/inertiaui/modal/pull/44

**Full Changelog**: https://github.com/inertiaui/modal/compare/0.6.4...0.7.0

## 0.6.4 - 2024-10-31

Rerelease of v0.6.3

**Full Changelog**: https://github.com/inertiaui/modal/compare/0.6.3...0.6.4

## 0.6.3 - 2024-10-31

### What's Changed

* Don't send the Base URL header on unrelated Axios requests by @pascalbaljet in https://github.com/inertiaui/modal/pull/43

**Full Changelog**: https://github.com/inertiaui/modal/compare/0.6.2...0.6.3

## 0.6.2 - 2024-10-29

### What's Changed

* Update props when redirecting back to same modal by @pascalbaljet in https://github.com/inertiaui/modal/pull/39
* Fix `close-explicitly` in Vue + update tests (see #36) by @pascalbaljet in https://github.com/inertiaui/modal/pull/40

**Full Changelog**: https://github.com/inertiaui/modal/compare/0.6.1...0.6.2

## 0.6.1 - 2024-10-28

* Fix `navigate` config option (as object) (see #35)
* Added `rtl` classes for slideover (see #34)

**Full Changelog**: https://github.com/inertiaui/modal/compare/0.6.0...0.6.1

## 0.6.0 - 2024-10-28

### What's Changed

* Added `useModal()` helper + renamed some props by @pascalbaljet in https://github.com/inertiaui/modal/pull/29
* Sync React/Vue navigate hook by @pascalbaljet in https://github.com/inertiaui/modal/pull/33

### New Contributors

* @dependabot made their first contribution in https://github.com/inertiaui/modal/pull/30

**Full Changelog**: https://github.com/inertiaui/modal/compare/0.5.4...0.6.0

## 0.5.4 - 2024-10-25

### What's Changed

* Session test by @pascalbaljet in https://github.com/inertiaui/modal/pull/26
* Nested modal redirect fix by @pascalbaljet in https://github.com/inertiaui/modal/pull/27

**Full Changelog**: https://github.com/inertiaui/modal/compare/0.5.3...0.5.4

## 0.5.3 - 2024-10-25

### What's Changed

* Update basic-usage.md by @Froelund in https://github.com/inertiaui/modal/pull/10
* Fix for `navigate` option in `visitModal()` by @pascalbaljet in https://github.com/inertiaui/modal/pull/21

### New Contributors

* @Froelund made their first contribution in https://github.com/inertiaui/modal/pull/10

**Full Changelog**: https://github.com/inertiaui/modal/compare/0.5.2...0.5.3

## 0.5.2 - 2024-10-23

* Support for callbacks before rerendering the base route / url

**Full Changelog**: https://github.com/inertiaui/modal/compare/0.5.0...0.5.2

## 0.5.0 - 2024-10-23

### What's Changed

* Base Route / URL by @pascalbaljet in https://github.com/inertiaui/modal/pull/18

**Full Changelog**: https://github.com/inertiaui/modal/commits/0.5.0

## 0.3.0 - 2024-10-02

* Introduced `ModalRoot` component (breaking change!)
* Introduced `visitModal` method

## 0.2.0 - 2024-09-30

* Support for other HTTP methods and data in `ModalLink`

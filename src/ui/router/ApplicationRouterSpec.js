import { createOpenMct, resetApplicationState } from 'utils/testing';

let openmct;
let element;
let child;
let appHolder;
let resolveFunction;

describe('Application router utility functions', () => {
    beforeEach(done => {
        appHolder = document.createElement('div');
        appHolder.style.width = '640px';
        appHolder.style.height = '480px';

        openmct = createOpenMct();
        openmct.install(openmct.plugins.MyItems());

        element = document.createElement('div');
        child = document.createElement('div');
        element.appendChild(child);

        openmct.on('start', () => {
            resolveFunction = () => {
                const success = window.location.hash !== null && window.location.hash !== '';
                if (success) {
                    done();
                }
            };

            openmct.router.on('change:hash', resolveFunction);
            openmct.router.setLocationFromUrl();
        });

        openmct.start(appHolder);

        document.body.append(appHolder);
    });

    afterEach(() => {
        openmct.router.removeListener('change:hash', resolveFunction);
        appHolder.remove();

        return resetApplicationState(openmct);
    });

    it('has initial hash when loaded', () => {
        const success = window.location.hash !== null;
        expect(success).toBe(true);
    });

    it('The setSearchParam function sets an individual search parameter in the window location hash', () => {
        openmct.router.setSearchParam('testParam', 'testValue');
        const searchParams = openmct.router.getAllSearchParams();
        expect(searchParams.get('testParam')).toBe('testValue');
    });

    it('The deleteSearchParam function deletes an individual search paramater in the window location hash', () => {
        openmct.router.deleteSearchParam('testParam');
        const searchParams = openmct.router.getAllSearchParams();
        expect(searchParams.get('testParam')).toBe(null);
    });

    it('The setSearchParam function sets a multiple individual search parameters in the window location hash', () => {
        openmct.router.setSearchParam('testParam1', 'testValue1');
        openmct.router.setSearchParam('testParam2', 'testValue2');

        const searchParams = openmct.router.getAllSearchParams();
        expect(searchParams.get('testParam1')).toBe('testValue1');
        expect(searchParams.get('testParam2')).toBe('testValue2');
    });

    it('The setAllSearchParams function replaces all search paramaters in the window location hash', () => {
        openmct.router.setSearchParam('testParam2', 'updatedtestValue2');
        openmct.router.setSearchParam('newTestParam3', 'newTestValue3');

        const searchParams = openmct.router.getAllSearchParams();
        expect(searchParams.get('testParam2')).toBe('updatedtestValue2');
        expect(searchParams.get('newTestParam3')).toBe('newTestValue3');
    });
});

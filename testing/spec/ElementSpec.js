/**
 * Author: William Robert Howerton III
 */

describe("Element", function() {


    it("Should be able to find the right element using string in double quotes", function() {
        var element = find_element("H");
        expect(element.name).toEqual("Hydrogen");
        expect(element.number).toEqual(1);

        var element = find_element("Mt");
        expect(element.name).toEqual("Meitnerium");
        expect(element.number).toEqual(109);

    });

    it("Should be able to find the right element using string in single quotes", function() {
        var element = find_element('H');
        expect(element.name).toEqual("Hydrogen");
        expect(element.number).toEqual(1);

        var element = find_element('Mt');
        expect(element.name).toEqual("Meitnerium");
        expect(element.number).toEqual(109);
    });

    it("should return null if no element is found.", function() {
        var element = find_element('Nl');
        expect(element).toEqual(undefined);
    });

});

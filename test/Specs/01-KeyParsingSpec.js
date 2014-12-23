define(['underscore', 'ConfigurationManager'],
    function (_, ConfigurationManager) {
        describe("Key Parsing", function () {

            it("should convert string into valid array(exact)", function () {
                var CM = new ConfigurationManager();
                expect(_.isEqual(CM.parseKey("A"), ["A"])).toBeTruthy();
                expect(_.isEqual(CM.parseKey("A.B"), ["A", "B"])).toBeTruthy();
                expect(_.isEqual(CM.parseKey("A.B.C"), ["A", "B", "C"])).toBeTruthy();
            });

            it("should convert string into valid array(corrected)", function () {
                var CM = new ConfigurationManager();
                expect(_.isEqual(CM.parseKey(".A"), ["A"])).toBeTruthy();
                expect(_.isEqual(CM.parseKey("A."), ["A"])).toBeTruthy();
                expect(_.isEqual(CM.parseKey(".A."), ["A"])).toBeTruthy();
                expect(_.isEqual(CM.parseKey("...A..."), ["A"])).toBeTruthy();
                //
                expect(_.isEqual(CM.parseKey(".A.B."), ["A", "B"])).toBeTruthy();
                expect(_.isEqual(CM.parseKey(".A...B."), ["A", "B"])).toBeTruthy();
                expect(_.isEqual(CM.parseKey("...A...B..."), ["A", "B"])).toBeTruthy();
            });

            it("should convert string into empty array", function () {
                var CM = new ConfigurationManager();
                expect(_.isEqual(CM.parseKey(), [])).toBeTruthy();
                expect(_.isEqual(CM.parseKey(""), [])).toBeTruthy();
                expect(_.isEqual(CM.parseKey(null), [])).toBeTruthy();
                expect(_.isEqual(CM.parseKey(true), [])).toBeTruthy();
                expect(_.isEqual(CM.parseKey(false), [])).toBeTruthy();
                expect(_.isEqual(CM.parseKey({}), [])).toBeTruthy();
                expect(_.isEqual(CM.parseKey(123), [])).toBeTruthy();
            });

            it("should leave correct array untouched", function () {
                var CM = new ConfigurationManager();
                expect(_.isEqual(CM.parseKey([]), [])).toBeTruthy();
                expect(_.isEqual(CM.parseKey(["A"]), ["A"])).toBeTruthy();
                expect(_.isEqual(CM.parseKey(["A", "B", "C"]), ["A", "B", "C"])).toBeTruthy();

            });

            it("should correct malformed array", function () {
                var CM = new ConfigurationManager();
                expect(_.isEqual(CM.parseKey(["A", ""]), ["A"])).toBeTruthy();
                expect(_.isEqual(CM.parseKey(["A", null]), ["A"])).toBeTruthy();
                expect(_.isEqual(CM.parseKey(["A", true]), ["A"])).toBeTruthy();
                expect(_.isEqual(CM.parseKey(["A", false]), ["A"])).toBeTruthy();
                expect(_.isEqual(CM.parseKey(["A", {}]), ["A"])).toBeTruthy();
                expect(_.isEqual(CM.parseKey(["A", []]), ["A"])).toBeTruthy();
                expect(_.isEqual(CM.parseKey(["A", 1]), ["A"])).toBeTruthy();
            });

            it("should handle long key", function () {
                var CM = new ConfigurationManager();
                var letters = "ABCDEFGHIJKLMNOPQRSTUVZXY";
                var ks = letters.split("").join(".");
                expect(CM.parseKey(ks).length).toBe(letters.length);
            });
        });
    }
);
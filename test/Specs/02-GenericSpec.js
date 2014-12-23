define(['underscore', 'ConfigurationManager'],
    function (_, ConfigurationManager) {
        describe("Generic", function () {

            it("should create ConfigurationManager", function () {
                var CM = new ConfigurationManager();
                expect(CM instanceof ConfigurationManager).toBeTruthy();
            });

            it("should create ConfigurationManager with empty configuration", function () {
                var CM = new ConfigurationManager();
                expect(_.isEmpty(CM.getAll())).toBeTruthy();
            });

            it("should create ConfigurationManager with empty configuration on bad config", function () {
                var CM;
                CM = new ConfigurationManager("");
                expect(_.isEmpty(CM.getAll())).toBeTruthy();
                CM = new ConfigurationManager([]);
                expect(_.isEmpty(CM.getAll())).toBeTruthy();
                CM = new ConfigurationManager(null);
                expect(_.isEmpty(CM.getAll())).toBeTruthy();
                CM = new ConfigurationManager(true);
                expect(_.isEmpty(CM.getAll())).toBeTruthy();
                CM = new ConfigurationManager(false);
                expect(_.isEmpty(CM.getAll())).toBeTruthy();
                CM = new ConfigurationManager(123);
                expect(_.isEmpty(CM.getAll())).toBeTruthy();
            });

            it("should create ConfigurationManager with valid passed configuration", function () {
                var config = {a: "A", b: "B", c: "C"};
                var CM = new ConfigurationManager(config);
                expect(_.isEqual(CM.getAll(), config)).toBeTruthy();
            });

            it("should return correct configuration values", function () {
                var config = {a: "A", b: "B", c: "C"};
                var CM = new ConfigurationManager(config);
                expect(CM.get("a")).toBe("A");
                expect(CM.get(["a"])).toBe("A");
                expect(CM.get("b")).toBe("B");
                expect(CM.get(["b"])).toBe("B");
                expect(CM.get("c")).toBe("C");
                expect(CM.get(["c"])).toBe("C");
            });

            it("should set and return correct configuration values", function () {
                var config = {a: "A", b: "B", c: "C"};
                var CM = new ConfigurationManager(config);
                CM.set("a", "AAA");
                CM.set("b", "BBB");
                CM.set("c", "CCC");
                expect(CM.get("a")).toBe("AAA");
                expect(CM.get(["a"])).toBe("AAA");
                expect(CM.get("b")).toBe("BBB");
                expect(CM.get(["b"])).toBe("BBB");
                expect(CM.get("c")).toBe("CCC");
                expect(CM.get(["c"])).toBe("CCC");
            });

            it("should add and return correct configuration values", function () {
                var CM = new ConfigurationManager({});
                CM.set("a", "AAA");
                CM.set("b", "BBB");
                CM.set("c", "CCC");
                expect(CM.get("a")).toBe("AAA");
                expect(CM.get(["a"])).toBe("AAA");
                expect(CM.get("b")).toBe("BBB");
                expect(CM.get(["b"])).toBe("BBB");
                expect(CM.get("c")).toBe("CCC");
                expect(CM.get(["c"])).toBe("CCC");
            });

            it("should keep configuration types", function () {
                var CM = new ConfigurationManager({});
                //string(...I think we have checked this already ;))
                CM.set("a", "AAA");
                expect(CM.get("a")).toBe("AAA");
                expect(_.isString(CM.get("a"))).toBeTruthy();
                //number
                CM.set("a", 123);
                expect(CM.get("a")).toBe(123);
                expect(_.isNumber(CM.get("a"))).toBeTruthy();
                //boolean(true)
                CM.set("a", true);
                expect(CM.get("a")).toBe(true);
                expect(_.isBoolean(CM.get("a"))).toBeTruthy();
                //boolean(false)
                CM.set("a", false);
                expect(CM.get("a")).toBe(false);
                expect(_.isBoolean(CM.get("a"))).toBeTruthy();
                //array
                CM.set("a", ["A","B","C"]);
                expect(_.isEqual(CM.get("a"), ["A","B","C"])).toBeTruthy();
                expect(_.isArray(CM.get("a"))).toBeTruthy();
                //Date
                var D = new Date();
                CM.set("a", D);
                expect(CM.get("a")).toBe(D);
                expect(_.isDate(CM.get("a"))).toBeTruthy();
                //
                var F = function() {return {test:"TEST"};};
                CM.set("a", F);
                expect(CM.get("a")).toBe(F);
                expect(_.isFunction(CM.get("a"))).toBeTruthy();
                //@todo: finish me

            });


            it("should merge and return correct configuration values", function () {
                var config = {a: "A", b: "B", c: "C"};
                var CM = new ConfigurationManager(config);
                var config2 = {a: "AAA", x: "X", y: "Y"};
                CM.merge(config2);
                expect(_.has(CM.getAll(), "a")).toBeTruthy();
                expect(_.has(CM.getAll(), "b")).toBeTruthy();
                expect(_.has(CM.getAll(), "c")).toBeTruthy();
                expect(_.has(CM.getAll(), "x")).toBeTruthy();
                expect(_.has(CM.getAll(), "y")).toBeTruthy();
                //
                expect(CM.get("a")).toBe("AAA");
                expect(CM.get("b")).toBe("B");
                expect(CM.get("c")).toBe("C");
                expect(CM.get("x")).toBe("X");
                expect(CM.get("y")).toBe("Y");
                //
            });





            it("should reset to original configuration on restoreDefaults", function () {
                var config = {a: "A", b: "B", c: "C"};
                var CM = new ConfigurationManager(config);
                expect(_.isEqual(CM.getAll(), config)).toBeTruthy();
                CM.set("a", "AAA");
                CM.set("b", "BBB");
                CM.set("c", "CCC");
                expect(_.isEqual(CM.getAll(), {a: "AAA", b: "BBB", c: "CCC"})).toBeTruthy();
                CM.restoreDefaults();
                expect(_.isEqual(CM.getAll(), config)).toBeTruthy();
            });

        });
    }
);
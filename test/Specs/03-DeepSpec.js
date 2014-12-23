define(['underscore', 'ConfigurationManager'],
    function (_, ConfigurationManager) {
        describe("Deep Configurations", function () {

            it("should create deep config", function () {
                var CM = new ConfigurationManager({
                    a: {
                        a1: "A1",
                        a2: "A2"
                    },
                    b: {
                        b1: "B1",
                        b2: "B2"
                    }
                });
                expect(CM.hasKey("a")).toBeTruthy();
                expect(CM.hasKey("a.a1")).toBeTruthy();
                expect(CM.hasKey("a.a2")).toBeTruthy();
                expect(CM.hasKey("b")).toBeTruthy();
                expect(CM.hasKey("b.b1")).toBeTruthy();
                expect(CM.hasKey("b.b2")).toBeTruthy();
                //
                expect(_.isObject(CM.get("a"))).toBeTruthy();
                expect(_.isObject(CM.get(["a"]))).toBeTruthy();
                expect(_.isObject(CM.get("b"))).toBeTruthy();
                expect(_.isObject(CM.get(["b"]))).toBeTruthy();
                //
                expect(CM.get("a.a1")).toBe("A1");
                expect(CM.get("a.a2")).toBe("A2");
                expect(CM.get("b.b1")).toBe("B1");
                expect(CM.get("b.b2")).toBe("B2");
                //
                expect(CM.get(["a", "a1"])).toBe("A1");
                expect(CM.get(["a", "a2"])).toBe("A2");
                expect(CM.get(["b", "b1"])).toBe("B1");
                expect(CM.get(["b", "b2"])).toBe("B2");
            });


        });
    }
);

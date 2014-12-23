define(['ConfigurationManager'],
    function (ConfigurationManager) {

        it("should create ConfigurationManager", function () {
            var cfg = new ConfigurationManager();
            expect(cfg instanceof ConfigurationManager).toBeTruthy();
        });

    }
);
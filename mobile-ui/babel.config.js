process.env.TAMAGUI_TARGET = "native";

module.exports = function (api) {
    api.cache(true);
    return {
        presets: ["babel-preset-expo"],
        plugins: [
            "nativewind/babel",
            [
                "@tamagui/babel-plugin",
                {
                    components: ["tamagui"],
                    config: "./tamagui.config.js",
                    logTimings: true,
                },
            ],
            [
                "transform-inline-environment-variables",
                {
                    include: "TAMAGUI_TARGET",
                },
            ],
            "react-native-reanimated/plugin",
            [
                "module:react-native-dotenv",
                {
                    envName: "APP_ENV",
                    moduleName: "@env",
                    path: "../.env",
                    safe: false,
                    allowUndefined: true,
                    verbose: false,
                },
            ],
        ],
    };
};

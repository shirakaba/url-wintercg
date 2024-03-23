{
    "variables": {
        "v8_enable_i18n_support%": 1,
        "ada_sources": ["./lib/ada/ada.cpp"],
    },
    "targets": [
        {
            "target_name": "url-wintercg-native",
            "sources": ["src/url_wintercg.cc", "<@(ada_sources)"],
            "include_dirs": [
                "<!@(node -p \"require('node-addon-api').include\")",
                "./lib/ada",
            ],
            "direct_dependent_settings": {
                "include_dirs": ["./lib/ada"],
            },
            "dependencies": ["<!(node -p \"require('node-addon-api').gyp\")"],
            "cflags!": ["-fno-exceptions"],
            "cflags_cc!": ["-fno-exceptions"],
            "xcode_settings": {
                "GCC_ENABLE_CPP_EXCEPTIONS": "YES",
                "CLANG_CXX_LIBRARY": "libc++",
                # We set our deployment target as 10.13 as any lower and we get:
                # > error: 'value' is unavailable: introduced in macOS 10.13
                "MACOSX_DEPLOYMENT_TARGET": "10.13",
            },
            "msvs_settings": {
                "VCCLCompilerTool": {"ExceptionHandling": 1},
            },
        },
    ],
}

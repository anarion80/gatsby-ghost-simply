import React from "react"

export const onRenderBody = ({ setHeadComponents, setHtmlAttributes }) => {
    setHeadComponents ([
        <script
            key="darkmode"
            dangerouslySetInnerHTML={{
                __html: `(function() {
                function setTheme(theme) {
                    window.__theme = theme;
                    if (theme === 'dark') {
                        document.documentElement.className = 'dark';
                    } else {
                        document.documentElement.className = 'light';
                    }
                };
                window.__setPreferredTheme = function(theme) {
                    setTheme(theme);
                    try {
                    localStorage.setItem('theme', theme);
                    } catch (e) {}
                };
                let preferredTheme;
                try {
                    preferredTheme = localStorage.getItem('theme');
                } catch (e) {}
                let darkQuery = window.matchMedia('(prefers-color-scheme: dark)');
                setTheme(preferredTheme || (darkQuery.matches ? 'dark' : 'light'));
                })();`,
            }}
        />,
    ])
    setHtmlAttributes({ lang: `en` })
}
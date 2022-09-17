<script lang="ts">
    import Prism from 'prismjs';

    import { lang_aliases, lang_dependencies} from './langdata';
    import type { LangDataItem } from './langdata';
	import { onMount } from 'svelte';

    // export parameter.
    export let languages_path: string = "";
    export let use_minified: boolean = true;
    let lang_data: Record<string, LangDataItem> = {};
    
	onMount(async () => {
		// add to prism.plugins
		Prism.plugins.autoloader = {
			languages_path: languages_path,
			loadLanguages: loadLanguages,
			use_minified: use_minified
		}
		// trigger hightlightAll.
		Prism.highlightAll();
	})

	Prism.hooks.add("complete", (env) => {
		let element = env.element;
		let language = env.language;

		if (!element || !language) {
			return;
		}

		var deps = getDependencies(element);
		if (/^diff-./i.test(language)) {
			// the "diff-xxxx" format is used by the Diff Highlight plugin
			deps.push('diff');
			deps.push(language.substring('diff-'.length));
		} else {
			deps.push(language);
		}

		if (!deps.every(isLoaded)) {
			// the language or some dependencies aren't loaded
			loadLanguages(deps, function () {
				Prism.highlightElement(element);
			});
		}
	})

    /**
     * Lazily loads an external script.
     *
     * @param {string} src
     * @param {() => void} [success]
     * @param {() => void} [error]
     */
    const addScript = (src: string, success: CallableFunction, error: CallableFunction) => {
        let s = document.createElement('script');
        s.src = src;
        s.async = true;
        s.onload = function () {
            document.body.removeChild(s);
            success && success();
        };
        s.onerror = function () {
            document.body.removeChild(s);
            error && error();
        };
        document.body.appendChild(s);
    }


    /**
     * Returns all additional dependencies of the given element defined by the `data-dependencies` attribute.
     *
     * @param {Element} element
     * @returns {string[]}
     */
    const getDependencies = (element: Element) => {
        let deps = (element.getAttribute('data-dependencies') || '').trim();
        if (!deps) {
            let parent = element.parentElement;
            if (parent && parent.tagName.toLowerCase() === 'pre') {
                deps = (parent.getAttribute('data-dependencies') || '').trim();
            }
        }
        return deps ? deps.split(/\s*,\s*/g) : [];
    }

    /**
     * Returns whether the given language is currently loaded.
     *
     * @param {string} lang
     * @returns {boolean}
     */
    const isLoaded = (lang: string) => {
        if (lang.indexOf('!') >= 0) {
            // forced reload
            return false;
        }

        lang = lang_aliases[lang] || lang; // resolve alias

        if (lang in Prism.languages) {
            // the given language is already loaded
            return true;
        }

        // this will catch extensions like CSS extras that don't add a grammar to Prism.languages
        let data = lang_data[lang];
        return data && !data.error && data.loading === false;
    }

	const getLanguagePath = (lang: string) => {
		return languages_path + 'prism-' + lang + (use_minified ? '.min' : '') + '.js';
	}


	/**
	 * Loads a grammar with its dependencies.
	 *
	 * @param {string} lang
	 * @param {() => void} [success]
	 * @param {() => void} [error]
	 */
    const loadLanguage = (lang: string, success: (() => void), error: (() => void)) => {
		let force = lang.indexOf('!') >= 0;

		lang = lang.replace('!', '');
		lang = lang_aliases[lang] || lang;

		function load() {
			let data = lang_data[lang];
			if (!data) {
				data = lang_data[lang] = {
					callbacks: []
				};
			}
			data.callbacks.push({
				success: success,
				error: error
			});

			if (!force && isLoaded(lang)) {
				// the language is already loaded and we aren't forced to reload
				languageCallback(lang, 'success');
			} else if (!force && data.error) {
				// the language failed to load before and we don't reload
				languageCallback(lang, 'error');
			} else if (force || !data.loading) {
				// the language isn't currently loading and/or we are forced to reload
				data.loading = true;
				data.error = false;

				addScript(getLanguagePath(lang), function () {
					data.loading = false;
					languageCallback(lang, 'success');

				}, function () {
					data.loading = false;
					data.error = true;
					languageCallback(lang, 'error');
				});
			}
		}

		let dependencies = lang_dependencies[lang];
		if (dependencies && dependencies.length) {
			loadLanguages(dependencies, load, error);
		} else {
			load();
		}
	}



	/**
	 * Loads all given grammars concurrently.
	 *
	 * @param {string[]|string} languages
	 * @param {(languages: string[]) => void} [success]
	 * @param {(language: string) => void} [error] This callback will be invoked on the first language to fail.
	 */
     const loadLanguages = (languages: string[] | string, success?: CallableFunction, error?: CallableFunction) => {
		if (typeof languages === 'string') {
			languages = [languages];
		}

	    let total = languages.length;
	    let completed = 0;
	    let failed = false;

		if (total === 0) {
			if (success) {
				setTimeout(success, 0);
			}
			return;
		}

		function successCallback() {
			if (failed) {
				return;
			}
			completed++;
			if (completed === total) {
				success && success(languages);
			}
		}

		languages.forEach(function (lang) {
			loadLanguage(lang, successCallback, function () {
				if (failed) {
					return;
				}
				failed = true;
				error && error(lang);
			});
		});
	}


	/**
	 * Runs all callbacks of the given type for the given language.
	 *
	 * @param {string} lang
	 * @param {"success" | "error"} type
	 */
    const languageCallback = (lang:string , type: "success" | "error") => {
		if (lang_data[lang]) {
			let callbacks = lang_data[lang].callbacks;
			for (let i = 0, l = callbacks.length; i < l; i++) {
				let callback = callbacks[i][type];
				if (callback) {
					setTimeout(callback, 0);
				}
			}
			callbacks.length = 0;
		}
	}

</script>
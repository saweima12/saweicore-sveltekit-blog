<script lang="ts">
  import { onMount } from "svelte";

  export let reponame: string;
  export let issueTerm: string = "pathname";  
  export let label: string = "comments";
  export let theme: string;

  let divElm: HTMLDivElement;  
  let scriptElm: HTMLScriptElement;
  
  let isInitial: boolean = false;
  
  $: {
    if (isInitial) {
      try {
          const iFrame = divElm.getElementsByClassName("utterances-frame")[0];

        if (iFrame) {
          let _iFrame: any = iFrame;
          _iFrame.contentWindow.postMessage(
            { type: "set-theme", theme },
            "https://utteranc.es"
          );
        }
      } catch (err) {
        // The iFrame has not been loaded yet.
        console.log("error", err);
      }
    }
  }
  onMount(() => {
    scriptElm = document.createElement("script");

    scriptElm.setAttribute("repo", reponame);
    scriptElm.setAttribute("issue-term", issueTerm);
    scriptElm.setAttribute("label", label);
    scriptElm.setAttribute("theme", theme);
    scriptElm.setAttribute("crossorigin", "anonymous");
    scriptElm.src = "https://utteranc.es/client.js";

    divElm.appendChild(scriptElm);
    isInitial = true;
  });
</script>

<div bind:this={divElm} />

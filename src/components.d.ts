/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface AppRoot {
    }
    interface RecordsList {
    }
}
declare global {
    interface HTMLAppRootElement extends Components.AppRoot, HTMLStencilElement {
    }
    var HTMLAppRootElement: {
        prototype: HTMLAppRootElement;
        new (): HTMLAppRootElement;
    };
    interface HTMLRecordsListElement extends Components.RecordsList, HTMLStencilElement {
    }
    var HTMLRecordsListElement: {
        prototype: HTMLRecordsListElement;
        new (): HTMLRecordsListElement;
    };
    interface HTMLElementTagNameMap {
        "app-root": HTMLAppRootElement;
        "records-list": HTMLRecordsListElement;
    }
}
declare namespace LocalJSX {
    interface AppRoot {
    }
    interface RecordsList {
    }
    interface IntrinsicElements {
        "app-root": AppRoot;
        "records-list": RecordsList;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "app-root": LocalJSX.AppRoot & JSXBase.HTMLAttributes<HTMLAppRootElement>;
            "records-list": LocalJSX.RecordsList & JSXBase.HTMLAttributes<HTMLRecordsListElement>;
        }
    }
}

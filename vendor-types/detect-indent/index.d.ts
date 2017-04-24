declare module 'detect-indent' {

    declare function detectIndent(path: string): IndentionProperties;

    declare namespace detectIndent { }

    declare class IndentionProperties {
        public amount: number;
        public type: 'tab' | 'space' | null;
        public indent: string;
    }

    export = detectIndent;

}
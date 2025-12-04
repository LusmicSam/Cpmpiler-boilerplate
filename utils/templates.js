export const languageTemplates = {
    javascript: `// JavaScript Starter Code
console.log("Hello, World!");
`,
    python: `# Python Starter Code
print("Hello, World!")
`,
    cpp: `// C++ Starter Code
#include <iostream>

int main() {
    std::cout << "Hello, World!" << std::endl;
    return 0;
}
`,
    java: `// Java Starter Code
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
`,
    c: `// C Starter Code
#include <stdio.h>

int main() {
    printf("Hello, World!\\n");
    return 0;
}
`
};

export const languageIds = {
    javascript: 63,
    python: 71,
    cpp: 54,
    java: 62,
    c: 50
};


export const getTemplateForFile = (fileName) => {
    const ext = fileName.split('.').pop()?.toLowerCase();
    switch (ext) {
        case 'js': return languageTemplates.javascript;
        case 'py': return languageTemplates.python;
        case 'cpp': return languageTemplates.cpp;
        case 'java': return languageTemplates.java;
        case 'c': return languageTemplates.c;
        default: return "";
    }
};

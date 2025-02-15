import fs from 'fs';

// Function to read and process rewrite rules from a file
function readRewriteRules(filePath: string): string[] | null {
    // Check if the file exists
    if (!fs.existsSync(filePath)) {
        console.log(`Error: The file ${filePath} does not exist.`);
        process.exit(1); // Exit the program with a failure status
    }

    const fileContent = fs.readFileSync(filePath, 'utf-8');

    // Split the file content into lines and filter out empty lines or comments (lines starting with '#')
    const rules = fileContent.split('\n')
        .map(line => line.trim()) // Trim each line
        .filter(line => line !== '' && !line.startsWith('#')); // Remove empty lines and comments

    return rules;
}

// Function to test the rewrite rules
function testRewriteRules(rules: string[]) {
    // Loop over each rule in the collection
    rules.forEach(rule => {
        console.log(`Testing rule: ${rule}`);
        // Example test: Here you can implement whatever logic you need to test the rule
        // For example, checking if the rule contains a valid pattern
        if (rule.includes('RewriteRule')) {
            console.log(`Valid rule found: ${rule}`);
            // You can add further logic to test if the rule works, depending on your use case.
        } else {
            console.log(`Invalid rule: ${rule}`);
        }
    });
}

// Example usage
const filePath = 'rewrite_rules.txt';
const rules = readRewriteRules(filePath); // Returns null and exits if the file doesn't exist
if (rules) {
    testRewriteRules(rules);
}

#!/usr/bin/env node

const README_FILE_TEMPLATE = "./README_TEMPLATE.md";
const CHALLENGES_DETAILS_FILE = "./challenges.json";
const HOST_URL = "http://build-dribbble-shots.vercel.app/"
const OUTPUT_FILE = "./README.md";

const fs = require('fs');
let content = fs.readFileSync(README_FILE_TEMPLATE, {
    encoding: 'utf-8'
})

const CHALLENGES_DATA = JSON.parse(
    fs.readFileSync(CHALLENGES_DETAILS_FILE, {
        encoding: 'utf-8'
    })
);

/**
 * This function creates a table from the data from the
 * CHALLENGES_DETAILS_FILE
 * @param {Array<Object>} challenges
 * @exports String The generated table
 */
function createChallengeTable(challenges) {
    const lines = [
        "| Challenge Name | Designed By | Status |",
        "|----------------|-------------|--------|"
    ]
    /**
     * Creates a row for a specified challenge
     * @param {Object} challenge
     * @exports String The generated row for the challenge
     */
    const createChallengeRow = (challenge) => {
        const formatName = str => str.split('-').map(word => word[0].toUpperCase() + word.slice(1)).join(' ');
        let demoUrl = HOST_URL + challenge["challenge-directory"];
        return `| [${challenge["challenge-name"]}](${challenge["challenge-directory"]}) ([Demo](${demoUrl})) | [${challenge["designed-by"]}](${challenge["dribbble-link"]}) | ${formatName(challenge["status"])} |`;

    }

    challenges.map(createChallengeRow).forEach(row => lines.push(row));
    return lines.join('\n');
}

let challengeTable = createChallengeTable(CHALLENGES_DATA);
const FILENAME = __filename.slice(__dirname.length + 1);

content = content
    .replace("<challenges_table>", challengeTable)
    .replace("<info_about_creation>", `This README was created using [${README_FILE_TEMPLATE}](./${README_FILE_TEMPLATE}) by [${FILENAME}](./${FILENAME})`);

fs.writeFileSync(OUTPUT_FILE, content);
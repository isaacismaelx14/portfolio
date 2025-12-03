#!/usr/bin/env node

/**
 * Custom release script that handles squash merge commits
 * Replaces release-it with full functionality:
 * - Parses bullet points like "* feat: description" from commit bodies
 * - Updates CHANGELOG.md
 * - Updates package.json version
 * - Commits changes
 * - Creates git tag
 * - Pushes to remote
 * - Creates GitHub release with notes
 */

import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import https from 'node:https';

const CHANGELOG_PATH = path.join(process.cwd(), 'CHANGELOG.md');
const PACKAGE_PATH = path.join(process.cwd(), 'package.json');
const REPO_OWNER = 'isaacismaelx14';
const REPO_NAME = 'portfolio';

// Get the last tag
function getLastTag() {
    try {
        return execSync('git describe --tags --abbrev=0 2>/dev/null', { encoding: 'utf-8' }).trim();
    } catch {
        return null;
    }
}

// Get commits since last tag
function getCommitsSinceTag(tag) {
    const range = tag ? `${tag}..HEAD` : 'HEAD';
    try {
        const log = execSync(`git log ${range} --pretty=format:"%B---COMMIT_END---"`, { encoding: 'utf-8' });
        return log.split('---COMMIT_END---').filter(c => c.trim());
    } catch {
        return [];
    }
}

// Parse conventional commit lines from commit body
function parseCommitBody(body) {
    const lines = body.split('\n');
    const changes = {
        features: [],
        fixes: [],
        perf: [],
        style: [],
        refactor: [],
        docs: [],
        breaking: []
    };

    for (const line of lines) {
        const trimmed = line.trim();
        
        // Match patterns like "* feat: description" or "feat: description" or "* feat(scope): description"
        const match = trimmed.match(/^\*?\s*(feat|fix|perf|style|refactor|docs|chore)(?:\([^)]*\))?!?:\s*(.+)$/i);
        
        if (match) {
            const [, type, description] = match;
            const cleanDesc = description.trim();
            
            // Check for breaking change indicator
            if (trimmed.includes('!:') || trimmed.toUpperCase().includes('BREAKING')) {
                changes.breaking.push(cleanDesc);
            }
            
            switch (type.toLowerCase()) {
                case 'feat':
                    changes.features.push(cleanDesc);
                    break;
                case 'fix':
                    changes.fixes.push(cleanDesc);
                    break;
                case 'perf':
                    changes.perf.push(cleanDesc);
                    break;
                case 'style':
                    changes.style.push(cleanDesc);
                    break;
                case 'refactor':
                    changes.refactor.push(cleanDesc);
                    break;
                case 'docs':
                    changes.docs.push(cleanDesc);
                    break;
            }
        }
        
        // Also check for BREAKING CHANGE notes
        if (trimmed.startsWith('BREAKING CHANGE:') || trimmed.startsWith('BREAKING CHANGES:')) {
            changes.breaking.push(trimmed.replace(/^BREAKING CHANGES?:\s*/, ''));
        }
    }

    return changes;
}

// Determine version bump type
function determineBumpType(changes) {
    if (changes.breaking.length > 0) return 'major';
    if (changes.features.length > 0) return 'minor';
    if (changes.fixes.length > 0 || changes.perf.length > 0) return 'patch';
    return 'patch';
}

// Bump version
function bumpVersion(currentVersion, bumpType) {
    const [major, minor, patch] = currentVersion.split('.').map(Number);
    
    switch (bumpType) {
        case 'major':
            return `${major + 1}.0.0`;
        case 'minor':
            return `${major}.${minor + 1}.0`;
        case 'patch':
        default:
            return `${major}.${minor}.${patch + 1}`;
    }
}

// Generate changelog entry
function generateChangelogEntry(version, changes, date) {
    let entry = `## [${version}](https://github.com/${REPO_OWNER}/${REPO_NAME}/releases/tag/v${version}) (${date})\n\n`;
    
    if (changes.breaking.length > 0) {
        entry += `### ⚠ BREAKING CHANGES\n\n`;
        changes.breaking.forEach(c => entry += `* ${c}\n`);
        entry += '\n';
    }
    
    if (changes.features.length > 0) {
        entry += `### Features\n\n`;
        changes.features.forEach(c => entry += `* ${c}\n`);
        entry += '\n';
    }
    
    if (changes.fixes.length > 0) {
        entry += `### Bug Fixes\n\n`;
        changes.fixes.forEach(c => entry += `* ${c}\n`);
        entry += '\n';
    }
    
    if (changes.perf.length > 0) {
        entry += `### Performance\n\n`;
        changes.perf.forEach(c => entry += `* ${c}\n`);
        entry += '\n';
    }
    
    if (changes.style.length > 0) {
        entry += `### Styles\n\n`;
        changes.style.forEach(c => entry += `* ${c}\n`);
        entry += '\n';
    }
    
    if (changes.refactor.length > 0) {
        entry += `### Refactoring\n\n`;
        changes.refactor.forEach(c => entry += `* ${c}\n`);
        entry += '\n';
    }
    
    if (changes.docs.length > 0) {
        entry += `### Documentation\n\n`;
        changes.docs.forEach(c => entry += `* ${c}\n`);
        entry += '\n';
    }
    
    return entry;
}

// Generate release notes (markdown for GitHub release)
function generateReleaseNotes(changes) {
    let notes = '';
    
    if (changes.breaking.length > 0) {
        notes += `## ⚠ BREAKING CHANGES\n\n`;
        changes.breaking.forEach(c => notes += `- ${c}\n`);
        notes += '\n';
    }
    
    if (changes.features.length > 0) {
        notes += `## 🚀 Features\n\n`;
        changes.features.forEach(c => notes += `- ${c}\n`);
        notes += '\n';
    }
    
    if (changes.fixes.length > 0) {
        notes += `## 🐛 Bug Fixes\n\n`;
        changes.fixes.forEach(c => notes += `- ${c}\n`);
        notes += '\n';
    }
    
    if (changes.perf.length > 0) {
        notes += `## ⚡ Performance\n\n`;
        changes.perf.forEach(c => notes += `- ${c}\n`);
        notes += '\n';
    }
    
    if (changes.style.length > 0) {
        notes += `## 💄 Styles\n\n`;
        changes.style.forEach(c => notes += `- ${c}\n`);
        notes += '\n';
    }
    
    if (changes.refactor.length > 0) {
        notes += `## ♻️ Refactoring\n\n`;
        changes.refactor.forEach(c => notes += `- ${c}\n`);
        notes += '\n';
    }
    
    if (changes.docs.length > 0) {
        notes += `## 📚 Documentation\n\n`;
        changes.docs.forEach(c => notes += `- ${c}\n`);
        notes += '\n';
    }
    
    return notes.trim();
}

// Create GitHub release
async function createGitHubRelease(version, releaseNotes) {
    const token = process.env.GITHUB_TOKEN;
    
    if (!token) {
        console.log('⚠️  GITHUB_TOKEN not set, skipping GitHub release creation');
        console.log('   Set it with: export GITHUB_TOKEN=your_token');
        return false;
    }
    
    const data = JSON.stringify({
        tag_name: `v${version}`,
        name: `v${version}`,
        body: releaseNotes,
        draft: false,
        prerelease: false
    });
    
    return new Promise((resolve) => {
        const req = https.request({
            hostname: 'api.github.com',
            port: 443,
            path: `/repos/${REPO_OWNER}/${REPO_NAME}/releases`,
            method: 'POST',
            headers: {
                'Accept': 'application/vnd.github+json',
                'Authorization': `Bearer ${token}`,
                'X-GitHub-Api-Version': '2022-11-28',
                'User-Agent': 'release-script',
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(data)
            }
        }, (res) => {
            let body = '';
            res.on('data', chunk => body += chunk);
            res.on('end', () => {
                if (res.statusCode === 201) {
                    const release = JSON.parse(body);
                    console.log(`✅ GitHub release created: ${release.html_url}`);
                    resolve(true);
                } else {
                    console.log(`❌ Failed to create GitHub release: ${res.statusCode}`);
                    console.log(body);
                    resolve(false);
                }
            });
        });
        
        req.on('error', (e) => {
            console.log(`❌ Error creating GitHub release: ${e.message}`);
            resolve(false);
        });
        
        req.write(data);
        req.end();
    });
}

// Git operations
function gitAdd() {
    execSync('git add package.json CHANGELOG.md', { stdio: 'inherit' });
}

function gitCommit(version) {
    execSync(`git commit -m "chore(release): v${version}"`, { stdio: 'inherit' });
}

function gitTag(version) {
    execSync(`git tag v${version}`, { stdio: 'inherit' });
}

function gitPush() {
    execSync('git push', { stdio: 'inherit' });
    execSync('git push --tags', { stdio: 'inherit' });
}

// Main function
async function main() {
    const args = process.argv.slice(2);
    const dryRun = args.includes('--dry-run');
    const skipGitHub = args.includes('--skip-github');
    
    console.log('\n🚀 Starting release process...\n');
    
    // Get current version
    const packageJson = JSON.parse(fs.readFileSync(PACKAGE_PATH, 'utf-8'));
    const currentVersion = packageJson.version;
    
    // Get last tag and commits
    const lastTag = getLastTag();
    const commits = getCommitsSinceTag(lastTag);
    
    console.log(`📌 Last tag: ${lastTag || 'none'}`);
    console.log(`📝 Commits since last tag: ${commits.length}`);
    
    if (commits.length === 0) {
        console.log('\n⚠️  No new commits since last tag. Nothing to release.');
        process.exit(0);
    }
    
    // Parse all commits
    const allChanges = {
        features: [],
        fixes: [],
        perf: [],
        style: [],
        refactor: [],
        docs: [],
        breaking: []
    };
    
    for (const commit of commits) {
        const changes = parseCommitBody(commit);
        Object.keys(allChanges).forEach(key => {
            allChanges[key].push(...changes[key]);
        });
    }
    
    // Remove duplicates
    Object.keys(allChanges).forEach(key => {
        allChanges[key] = [...new Set(allChanges[key])];
    });
    
    // Check if there are any meaningful changes
    const totalChanges = Object.values(allChanges).flat().length;
    if (totalChanges === 0) {
        console.log('\n⚠️  No conventional commits found. Nothing to release.');
        console.log('   Make sure your commits follow the format: feat: description, fix: description, etc.');
        process.exit(0);
    }
    
    // Determine bump type and new version
    const bumpType = determineBumpType(allChanges);
    const newVersion = bumpVersion(currentVersion, bumpType);
    const date = new Date().toISOString().split('T')[0];
    
    console.log(`\n📦 Current version: ${currentVersion}`);
    console.log(`📈 Bump type: ${bumpType}`);
    console.log(`🆕 New version: ${newVersion}`);
    console.log(`\n📋 Changes found:`);
    if (allChanges.breaking.length) console.log(`   ⚠️  Breaking: ${allChanges.breaking.length}`);
    if (allChanges.features.length) console.log(`   ✨ Features: ${allChanges.features.length}`);
    if (allChanges.fixes.length) console.log(`   🐛 Bug Fixes: ${allChanges.fixes.length}`);
    if (allChanges.perf.length) console.log(`   ⚡ Performance: ${allChanges.perf.length}`);
    if (allChanges.style.length) console.log(`   💄 Styles: ${allChanges.style.length}`);
    if (allChanges.refactor.length) console.log(`   ♻️  Refactoring: ${allChanges.refactor.length}`);
    if (allChanges.docs.length) console.log(`   📚 Documentation: ${allChanges.docs.length}`);
    
    const changelogEntry = generateChangelogEntry(newVersion, allChanges, date);
    const releaseNotes = generateReleaseNotes(allChanges);
    
    if (dryRun) {
        console.log('\n' + '='.repeat(50));
        console.log('DRY RUN - No changes will be made');
        console.log('='.repeat(50));
        console.log('\n📄 CHANGELOG entry:\n');
        console.log(changelogEntry);
        console.log('📝 GitHub Release notes:\n');
        console.log(releaseNotes);
        process.exit(0);
    }
    
    // Step 1: Update package.json
    console.log('\n📝 Updating package.json...');
    packageJson.version = newVersion;
    fs.writeFileSync(PACKAGE_PATH, JSON.stringify(packageJson, null, 2) + '\n');
    
    // Step 2: Update changelog
    console.log('📝 Updating CHANGELOG.md...');
    let changelog = fs.readFileSync(CHANGELOG_PATH, 'utf-8');
    
    // Find where to insert (after the header)
    const headerMatch = changelog.match(/^# Changelog\n+(?:.*\n)*?\n(?=## )/);
    if (headerMatch) {
        const insertPos = headerMatch[0].length;
        changelog = changelog.slice(0, insertPos) + changelogEntry + changelog.slice(insertPos);
    } else {
        // No existing entries or different format
        const lines = changelog.split('\n');
        let insertIndex = 0;
        for (let i = 0; i < lines.length; i++) {
            if (lines[i].startsWith('## ') || (lines[i] === '' && i > 2)) {
                insertIndex = i;
                break;
            }
            insertIndex = i + 1;
        }
        lines.splice(insertIndex, 0, '', changelogEntry.trim(), '');
        changelog = lines.join('\n');
    }
    
    fs.writeFileSync(CHANGELOG_PATH, changelog);
    
    // Step 3: Git add
    console.log('📦 Staging changes...');
    gitAdd();
    
    // Step 4: Git commit
    console.log('💾 Committing changes...');
    gitCommit(newVersion);
    
    // Step 5: Git tag
    console.log(`🏷️  Creating tag v${newVersion}...`);
    gitTag(newVersion);
    
    // Step 6: Git push
    console.log('🚀 Pushing to remote...');
    gitPush();
    
    // Step 7: Create GitHub release
    if (!skipGitHub) {
        console.log('📢 Creating GitHub release...');
        await createGitHubRelease(newVersion, releaseNotes);
    }
    
    console.log('\n' + '='.repeat(50));
    console.log(`✅ Successfully released v${newVersion}!`);
    console.log('='.repeat(50) + '\n');
}

main().catch(console.error);

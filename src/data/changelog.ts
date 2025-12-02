// This file reads the version from package.json and parses CHANGELOG.md
// It's executed at build time by Astro

import fs from 'node:fs';
import path from 'node:path';

export interface ChangelogEntry {
    version: string;
    date: string;
    features: string[];
    bugFixes: string[];
    breakingChanges: string[];
}

export interface ChangelogData {
    version: string;
    entries: ChangelogEntry[];
}

function parseChangelog(): ChangelogEntry[] {
    const changelogPath = path.join(process.cwd(), 'CHANGELOG.md');
    
    if (!fs.existsSync(changelogPath)) {
        return [];
    }

    const content = fs.readFileSync(changelogPath, 'utf-8');
    const entries: ChangelogEntry[] = [];
    
    // Match version headers like "# 0.1.0 (2023-11-10)" or "## [2.0.0] - 2024-01-01"
    const versionRegex = /^#{1,2}\s+\[?(\d+\.\d+\.\d+)\]?\s*(?:\(([^)]+)\)|-\s*(\S+))?/gm;
    const sections = content.split(versionRegex);
    
    // Process in groups: [before, version, date1, date2, content, version, date1, date2, content, ...]
    for (let i = 1; i < sections.length; i += 4) {
        const version = sections[i];
        const date = sections[i + 1] || sections[i + 2] || 'Unknown';
        const sectionContent = sections[i + 3] || '';
        
        const features: string[] = [];
        const bugFixes: string[] = [];
        const breakingChanges: string[] = [];
        
        // Parse features
        const featuresMatch = sectionContent.match(/### Features\n([\s\S]*?)(?=###|$)/);
        if (featuresMatch) {
            const items = featuresMatch[1].match(/\* .+/g);
            if (items) {
                features.push(...items.map(item => 
                    item.replace(/^\* /, '').replace(/\s*\([a-f0-9]+\)$/, '').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
                ));
            }
        }
        
        // Parse bug fixes
        const bugFixesMatch = sectionContent.match(/### Bug Fixes\n([\s\S]*?)(?=###|$)/);
        if (bugFixesMatch) {
            const items = bugFixesMatch[1].match(/\* .+/g);
            if (items) {
                bugFixes.push(...items.map(item => 
                    item.replace(/^\* /, '').replace(/\s*\([a-f0-9]+\)$/, '').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
                ));
            }
        }
        
        // Parse breaking changes
        const breakingMatch = sectionContent.match(/### BREAKING CHANGES?\n([\s\S]*?)(?=###|$)/);
        if (breakingMatch) {
            const items = breakingMatch[1].match(/\* .+/g);
            if (items) {
                breakingChanges.push(...items.map(item => 
                    item.replace(/^\* /, '').replace(/\s*\([a-f0-9]+\)$/, '').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
                ));
            }
        }
        
        if (version) {
            entries.push({
                version,
                date,
                features,
                bugFixes,
                breakingChanges
            });
        }
    }
    
    return entries;
}

function getPackageVersion(): string {
    const packagePath = path.join(process.cwd(), 'package.json');
    
    if (!fs.existsSync(packagePath)) {
        return '0.0.0';
    }
    
    const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf-8'));
    return packageJson.version || '0.0.0';
}

export function getChangelogData(): ChangelogData {
    return {
        version: getPackageVersion(),
        entries: parseChangelog()
    };
}

export const APP_VERSION = getPackageVersion();

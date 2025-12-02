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
    
    // Split by version headers
    const versionBlocks = content.split(/^## /gm).filter(block => block.trim());
    
    for (const block of versionBlocks) {
        // Match version and date from format: [2.1.2](url) (2025-12-02) or [2.1.2] (2025-12-02)
        const headerMatch = block.match(/^\[?(\d+\.\d+\.\d+)\]?(?:\([^)]*\))?\s*\((\d{4}-\d{2}-\d{2})\)/);
        
        if (!headerMatch) continue;
        
        const version = headerMatch[1];
        const date = headerMatch[2];
        
        const features: string[] = [];
        const bugFixes: string[] = [];
        const breakingChanges: string[] = [];
        
        // Parse features
        const featuresMatch = block.match(/### Features\n([\s\S]*?)(?=###|$)/);
        if (featuresMatch) {
            const items = featuresMatch[1].match(/\* .+/g);
            if (items) {
                features.push(...items.map(item => 
                    item.replace(/^\* /, '').replace(/\s*\([a-f0-9]+\)$/, '').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
                ));
            }
        }
        
        // Parse bug fixes
        const bugFixesMatch = block.match(/### Bug Fixes\n([\s\S]*?)(?=###|$)/);
        if (bugFixesMatch) {
            const items = bugFixesMatch[1].match(/\* .+/g);
            if (items) {
                bugFixes.push(...items.map(item => 
                    item.replace(/^\* /, '').replace(/\s*\([a-f0-9]+\)$/, '').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
                ));
            }
        }
        
        // Parse breaking changes
        const breakingMatch = block.match(/### BREAKING CHANGES?\n([\s\S]*?)(?=###|$)/);
        if (breakingMatch) {
            const items = breakingMatch[1].match(/\* .+/g);
            if (items) {
                breakingChanges.push(...items.map(item => 
                    item.replace(/^\* /, '').replace(/\s*\([a-f0-9]+\)$/, '').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
                ));
            }
        }
        
        entries.push({
            version,
            date,
            features,
            bugFixes,
            breakingChanges
        });
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

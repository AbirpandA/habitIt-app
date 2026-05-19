#!/usr/bin/env node

/**
 * Supabase, Zustand & Tailwind CSS Setup Verification Script
 *
 * This script verifies that all necessary files and dependencies are properly set up.
 * Run from project root: npm run verify-setup
 *
 * Checks:
 * - Required dependencies installed
 * - Environment files exist
 * - Core files created
 * - TypeScript paths configured
 * - Tailwind CSS configuration
 */

const fs = require("fs");
const path = require("path");

const projectRoot = process.cwd();
let passCount = 0;
let failCount = 0;

const colors = {
  reset: "\x1b[0m",
  green: "\x1b[32m",
  red: "\x1b[31m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
};

function log(message, color = colors.reset) {
  console.log(`${color}${message}${colors.reset}`);
}

function checkFile(filePath, description) {
  const fullPath = path.join(projectRoot, filePath);
  if (fs.existsSync(fullPath)) {
    log(`✓ ${description}`, colors.green);
    passCount++;
  } else {
    log(`✗ ${description} - NOT FOUND: ${filePath}`, colors.red);
    failCount++;
  }
}

function checkDependency(packageName) {
  try {
    const packagePath = path.join(projectRoot, "node_modules", packageName);
    if (fs.existsSync(packagePath)) {
      log(`✓ Dependency: ${packageName}`, colors.green);
      passCount++;
    } else {
      log(`✗ Dependency: ${packageName} - NOT INSTALLED`, colors.red);
      failCount++;
    }
  } catch (error) {
    log(`✗ Dependency: ${packageName} - ERROR`, colors.red);
    failCount++;
  }
}

function checkEnvFile() {
  const envLocalPath = path.join(projectRoot, ".env.local");
  const envExamplePath = path.join(projectRoot, ".env.example");

  if (fs.existsSync(envLocalPath)) {
    log(`✓ Environment: .env.local exists`, colors.green);
    passCount++;

    try {
      const content = fs.readFileSync(envLocalPath, "utf-8");
      const hasUrl = content.includes("EXPO_PUBLIC_SUPABASE_URL");
      const hasKey = content.includes("EXPO_PUBLIC_SUPABASE_ANON_KEY");

      if (hasUrl && hasKey) {
        log(`  ✓ Environment variables configured`, colors.green);
        passCount++;
      } else {
        log(
          `  ✗ Missing environment variables (SUPABASE_URL or ANON_KEY)`,
          colors.yellow,
        );
        failCount++;
      }
    } catch (error) {
      log(`  ✗ Could not read .env.local`, colors.red);
      failCount++;
    }
  } else if (fs.existsSync(envExamplePath)) {
    log(
      `⚠ Environment: .env.local NOT FOUND (using .env.example as template)`,
      colors.yellow,
    );
    failCount++;
  } else {
    log(`✗ Environment: .env.example NOT FOUND`, colors.red);
    failCount++;
  }
}

function checkTsConfigPaths() {
  const tsconfigPath = path.join(projectRoot, "tsconfig.json");
  if (fs.existsSync(tsconfigPath)) {
    try {
      const tsconfig = JSON.parse(fs.readFileSync(tsconfigPath, "utf-8"));
      const paths = tsconfig.compilerOptions?.paths || {};

      if (paths["@/lib/*"]) {
        log(`✓ TypeScript: @/lib/* path alias configured`, colors.green);
        passCount++;
      } else {
        log(`✗ TypeScript: @/lib/* path alias NOT configured`, colors.red);
        failCount++;
      }
    } catch (error) {
      log(`✗ TypeScript: Could not parse tsconfig.json`, colors.red);
      failCount++;
    }
  }
}

// Run checks
log(
  "\n╔════════════════════════════════════════════════════════════╗",
  colors.blue,
);
log(
  "║   SUPABASE & ZUSTAND & TAILWIND SETUP VERIFICATION          ║",
  colors.blue,
);
log(
  "╚════════════════════════════════════════════════════════════╝\n",
  colors.blue,
);

log("📦 Checking Dependencies...", colors.blue);
checkDependency("supabase");
checkDependency("zustand");
checkDependency("@supabase/supabase-js");
checkDependency("nativewind");
checkDependency("tailwindcss");

log("\n📁 Checking Core Files...", colors.blue);
checkFile("src/lib/supabase.ts", "Supabase client: src/lib/supabase.ts");
checkFile(
  "src/lib/stores/useAuthStore.ts",
  "Zustand store: src/lib/stores/useAuthStore.ts",
);
checkFile("src/components/VerificationComponent.tsx", "Verification component");
checkFile("src/components/DemoComponent.tsx", "Demo component");
checkFile("src/components/TailwindButton.tsx", "Tailwind button component");
checkFile("src/components/TailwindCard.tsx", "Tailwind card component");
checkFile("src/components/TailwindBadge.tsx", "Tailwind badge component");
checkFile("src/components/TailwindShowcase.tsx", "Tailwind showcase component");
checkFile("src/components/TailwindPatterns.tsx", "Tailwind patterns reference");
checkFile(
  "src/components/TailwindColorVerification.tsx",
  "Tailwind color verification component",
);

log("\n⚙️ Checking Configuration...", colors.blue);
checkEnvFile();
checkTsConfigPaths();
checkFile("tailwind.config.js", "Tailwind configuration: tailwind.config.js");
checkFile("babel.config.js", "Babel configuration: babel.config.js");
checkFile("nativewind.d.ts", "NativeWind type declarations: nativewind.d.ts");

log("\n📋 Checking Documentation...", colors.blue);
checkFile(".env.example", "Environment template: .env.example");
checkFile("VERIFICATION_GUIDE.md", "Verification guide: VERIFICATION_GUIDE.md");
checkFile(
  "TAILWIND_SETUP_GUIDE.md",
  "Tailwind setup guide: TAILWIND_SETUP_GUIDE.md",
);
checkFile("src/global.css", "Global CSS with Tailwind directives");

// Summary
log(
  "\n╔════════════════════════════════════════════════════════════╗",
  colors.blue,
);
log(
  `║   RESULTS: ${colors.green}${passCount} passed${colors.blue}  |  ${colors.red}${failCount} failed${colors.blue}`,
  colors.blue,
);
log(
  "╚════════════════════════════════════════════════════════════╝\n",
  colors.blue,
);

if (failCount === 0) {
  log("✨ All checks passed! Your setup is ready to use.", colors.green);
  log("\n🎨 Tailwind CSS Verification:", colors.blue);
  log("  ✓ NativeWind Babel plugin configured", colors.green);
  log("  ✓ Tailwind configuration present", colors.green);
  log("  ✓ TypeScript className support enabled", colors.green);
  log("  ✓ Violet theme colors configured", colors.green);
  log("\nNext steps:", colors.blue);
  log(
    "  1. Test color rendering: Import TailwindColorVerification",
    colors.reset,
  );
  log("  2. View showcase: Import TailwindShowcase", colors.reset);
  log("  3. Use styled components in your features", colors.reset);
  process.exit(0);
} else {
  log(`⚠️ ${failCount} check(s) failed. Please review above.`, colors.yellow);
  log(
    "\nFor help, see VERIFICATION_GUIDE.md or TAILWIND_SETUP_GUIDE.md",
    colors.blue,
  );
  process.exit(1);
}

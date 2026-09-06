import test from "node:test";
import assert from "node:assert/strict";
import { discordInvite, siteOrigin } from "../src/lib/urls.ts";

test("an unconfigured or example invite never enables a join link", () => {
  for (const value of [
    undefined,
    "",
    " ",
    "https://discord.gg/replace-me",
    "https://discord.gg/EXAMPLE",
    "https://discord.com/invite/your-invite",
  ]) {
    assert.equal(discordInvite(value), null);
  }
});

test("only HTTPS invites on Discord hosts become join links", () => {
  for (const value of [
    "not a url",
    "javascript:alert(1)",
    "http://discord.gg/community",
    "https://discord.gg.evil.test/community",
    "https://discord.gg@evil.test/community",
    "https://someone@discord.gg/community",
    "https://discord.gg:444/community",
    "https://discord.com/channels/123",
    "https://discord.gg/",
  ]) {
    assert.equal(discordInvite(value), null, value);
  }
});

test("standard Discord invite forms normalize without tracking parameters", () => {
  assert.equal(
    discordInvite(" https://discord.gg/Abc_123-x/ "),
    "https://discord.gg/Abc_123-x",
  );
  assert.equal(
    discordInvite("https://discord.com/invite/Abc123?source=site#join"),
    "https://discord.gg/Abc123",
  );
  assert.equal(
    discordInvite("https://www.discord.com/invite/Abc123"),
    "https://discord.gg/Abc123",
  );
});

test("invalid or placeholder origins cannot crash page metadata", () => {
  for (const value of [
    undefined,
    "",
    "not a url",
    "https://example.org",
    "https://www.example.com/path",
    "javascript:alert(1)",
    "https://person:secret@community.test",
  ]) {
    assert.equal(siteOrigin(value).href, "http://localhost:9854/", value);
  }
});

test("configured site origins retain the host and port, not a path or query", () => {
  assert.equal(
    siteOrigin(" https://community.test/nested?tracking=1 ").href,
    "https://community.test/",
  );
  assert.equal(
    siteOrigin("http://localhost:9854/manifesto").href,
    "http://localhost:9854/",
  );
});

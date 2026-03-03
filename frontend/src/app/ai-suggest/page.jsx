"use client";

import { useState } from "react";
import Button from "../../components/ui/button";
import Input from "../../components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { getAiSuggestion } from "../../lib/blog-api";

export default function AiSuggestPage() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    setResult("");

    try {
      const response = await getAiSuggestion(input);
      setResult(String(response.data || ""));
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to get suggestion.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl">
      <Card>
        <CardHeader>
          <CardTitle>AI Suggest</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleGenerate}>
            <Input
              placeholder="Enter input"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              required
            />
            {error && <p className="text-sm text-red-400">{error}</p>}
            <Button type="submit" disabled={loading}>
              {loading ? "Generating..." : "Generate"}
            </Button>
          </form>

          {result && (
            <div className="mt-5 rounded-md border border-zinc-800 bg-zinc-900 p-4 text-sm text-zinc-200">
              {result}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

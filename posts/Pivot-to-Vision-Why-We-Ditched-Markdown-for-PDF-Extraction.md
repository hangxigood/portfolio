---

title: "Pivot to Vision: Why We Ditched Markdown for PDF Extraction" 
date: 2025-02-02 
tags:

- Docling
- Gemini
- 
---
In building our **Drilling Report Extraction Engine**, I recently made a major architectural pivot. I moved from a text-based conversion pipeline (using Docling) to a pure vision-based approach (using pdf2image + Gemini 3 Flash). Here's the story of why I switched and how it dramatically simplified our stack.

## The Old Way: The "Lossy" Middleman

Our initial architecture followed a standard RAG-like pattern:

1. **Ingest PDF**: Use `Docling` to parse the PDF.
2. **Convert to Markdown**: Attempt to reconstruct the complex drilling tables into Markdown format.
3. **LLM Extraction**: Feed the Markdown text to the LLM to extract JSON.

### The Problem

Drilling reports are visually complex. They often contain:

- Nested headers
- Merged cells
- Specific column alignments (like "NPT" flags)

I found that the **Markdown conversion step was "lossy."** Docling (and similar tools) struggled to perfectly represent the visual grid of the PDF in text. By the time the LLM saw the data, important spatial relationships—like which comment belonged to which time entry—were often garbled.

I was spending 80% of our time debugging the _conversion_ logic rather than the _extraction_ logic.

## The New Way: Eyes on the Data

I decided to cut out the middleman. Since modern LLMs like **Gemini 1.5 Flash** have excellent multimodal capabilities (Vision), why convert visual data to text at all?

### New Architecture

1. **PDF to Image**: I use `pdf2image` (with `poppler`) to convert every PDF page into a high-res image.
2. **Direct Vision Extraction**: I send the raw images directly to Gemini 3 Flash.
3. **Structured Output**: The LLM "sees" the page exactly as a human would and returns the structured Pydantic model.

```python

# The simplified pipeline

images = convert_from_bytes(pdf_bytes) # List[PIL.Image]

data = llm.extract(images) # Direct to Gemini Vision

```

## Cost Analysis

Is sending 20 images per report expensive? Surprisingly, no. Using **Gemini 3.0 Flash**:

- **Cost per 20-page report**: ~$0.006 (less than 1 cent)
- **Input**: ~53k tokens (images + text) @ $0.10/1M
- **Comparison**: ~22x cheaper than equivalent GPT-4o vision tasks.

For roughly **$18/month**, I can process 3,000 full reports. Vision is now cheap enough to be the default.

## Conclusion

By switching to a Vision-first approach, I:

1. **Reduced Code**: Deleted the entire Markdown conversion service.
2. **Improved Accuracy**: No more "translation errors" from PDF to Text.
3. **Simplified Debugging**: If the LLM fails, I know it's a prompt issue, not a parsing artifact.

Sometimes the best way to process a document is to just _look_ at it.
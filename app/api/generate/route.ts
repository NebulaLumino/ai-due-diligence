import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY, baseURL: 'https://api.deepseek.com/v1' });

export async function POST(req: NextRequest) {
  try {
    const { acquirer, target, dealType, targetStage, focusAreas, dealSize } = await req.json();

    const prompt = `You are a senior M&A due diligence analyst and corporate development professional.

Generate a comprehensive Due Diligence Question List with Red Flag Analysis for the proposed transaction.

**Transaction Details:**
- Acquirer/Buyer: ${acquirer}
- Target Company: ${target}
- Deal Type: ${dealType}
- Target Stage: ${targetStage}
- Estimated Deal Size: ${dealSize || 'Not specified'}
- Focus Areas: ${focusAreas.join(', ')}

Generate a complete due diligence document containing:

## 1. EXECUTIVE SUMMARY
Overview of the transaction and key diligence themes.

## 2. DUE DILIGENCE QUESTION LIST BY AREA
For each focus area, provide:
- Priority questions (15-20 per area)
- Document request list
- Red flag indicators

### Legal & Compliance
Corporate structure, material contracts, litigation, regulatory compliance, IP ownership, data privacy.

### Financial
Historical financials, revenue recognition, AR quality, debt, tax positions, off-balance sheet.

### Technical / Product
Technology stack, code ownership, technical debt, product roadmap, security practices.

### Commercial
Customer concentration, sales pipeline, GTM strategy, competitive positioning, supplier dependencies.

### People / HR
Key employee identification, compensation, cultural fit, employment agreements.

## 3. RED FLAG ANALYSIS 🔴
### Critical Red Flags (Stop signs)
Issues that could kill the deal with evidence to look for.

### Yellow Flags (Proceed with caution)
Issues requiring deeper investigation with potential impact quantification.

### Industry-Specific Red Flags
For a ${targetStage} ${dealType}.

## 4. DOCUMENT REQUEST LIST
| Category | Document | Priority | Purpose |

## 5. DILIGENCE TIMELINE & WORKSTREAM
- Week 1-2: Initial document review
- Week 3-4: Management meetings
- Week 5-6: Specialist workstreams
- Week 7-8: Final analysis

Format professionally with numbered questions, tables, and clear red flag indicators.`;

    const completion = await client.chat.completions.create({
      model: 'deepseek-chat',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 2000,
      temperature: 0.7,
    });

    return NextResponse.json({ result: completion.choices[0].message.content });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

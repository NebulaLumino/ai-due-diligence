import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { dealType, targetIndustry, dealSize, stage } = await req.json();

  const prompt = `You are a senior M&A due diligence specialist. Generate a comprehensive due diligence checklist and timeline for this transaction:

**Deal Type:** ${dealType}
**Target Industry:** ${targetIndustry}
**Deal Size:** ${dealSize}
**Transaction Stage:** ${stage}

Please provide:

1. **Legal Due Diligence Checklist**:
   - Corporate structure and governance
   - Material contracts (MSAs, NDAs, leases)
   - Intellectual property (patents, trademarks, copyrights, trade secrets)
   - Litigation and regulatory matters
   - Compliance and regulatory risk
   - Employment and labor matters
   - Tax structure and liabilities
   - Real property and assets
   - Insurance coverage

2. **Financial Due Diligence Checklist**:
   - Historical financials (3-5 years)
   - Quality of earnings analysis
   - Net working capital analysis
   - Indebtedness and debt schedule
   - Capital expenditure requirements
   - Projections and assumptions
   - Contingent liabilities
   - Audit history and accounting policies

3. **Technology Due Diligence Checklist** (for tech companies):
   - Codebase quality and technical debt
   - Architecture and scalability
   - Security and vulnerability assessment
   - Data privacy compliance
   - Open source dependencies and licenses
   - Infrastructure and cloud costs
   - IP ownership of developed technology
   - Engineering team and hiring plan

4. **HR Due Diligence Checklist**:
   - Employee headcount and org chart
   - Employment agreements and equity
   - Key person dependencies
   - Benefits and compensation structure
   - Culture and retention risks
   - Contractor vs. employee classification

5. **Commercial Due Diligence**:
   - Market size and TAM analysis
   - Customer concentration
   - Competitive positioning
   - Supplier and vendor dependencies
   - Sales pipeline and seasonality

6. **Timeline and Process**:
   - Week-by-week DD timeline for a ${stage} deal
   - Key milestones and deadlines
   - Data room requirements
   - Management meeting schedule

7. **Red Flags to Watch**:
   - Top 10 deal-killers specific to ${targetIndustry} ${dealType}
   - Common post-closing disputes
   - Valuation adjustment triggers

Format with clear sections, checkbox items, and priority indicators.`;

  try {
    const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.4,
        max_tokens: 5000,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      return NextResponse.json({ error: err }, { status: response.status });
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "No output received.";
    return NextResponse.json({ result: content });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

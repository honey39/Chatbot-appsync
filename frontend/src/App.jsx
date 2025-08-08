import { useState, useEffect } from "react";

function EmployeeList({ rows }) {
  if (!rows?.length) return <div>No matches.</div>;
  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            {[
              "Name",
              "City",
              "Joining Year",
              "Gender",
              "Age",
              "Email",
              "Phone",
            ].map((h) => (
              <th
                key={h}
                style={{
                  textAlign: "left",
                  borderBottom: "1px solid #444",
                  padding: "6px 8px",
                }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              <td
                style={{ padding: "6px 8px", borderBottom: "1px solid #333" }}
              >
                {r.name}
              </td>
              <td
                style={{ padding: "6px 8px", borderBottom: "1px solid #333" }}
              >
                {r.city}
              </td>
              <td
                style={{ padding: "6px 8px", borderBottom: "1px solid #333" }}
              >
                {r.joining_year}
              </td>
              <td
                style={{ padding: "6px 8px", borderBottom: "1px solid #333" }}
              >
                {r.gender}
              </td>
              <td
                style={{ padding: "6px 8px", borderBottom: "1px solid #333" }}
              >
                {r.age}
              </td>
              <td
                style={{ padding: "6px 8px", borderBottom: "1px solid #333" }}
              >
                {r.email}
              </td>
              <td
                style={{ padding: "6px 8px", borderBottom: "1px solid #333" }}
              >
                {r.phone}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function App() {
  // ✅ Initialize state from localStorage
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem("chatHistory");
    return saved ? JSON.parse(saved) : [];
  });

  const [input, setInput] = useState("");

  const [loading, setLoading] = useState(false);
  // ✅ Save history to localStorage whenever messages change
  useEffect(() => {
    localStorage.setItem("chatHistory", JSON.stringify(messages));
  }, [messages]);

  async function send() {
    const q = input.trim();
    if (!q) return;

    setMessages((m) => [...m, { role: "user", text: q }]);
    setInput("");

    // parse: "employees in <city>"
    const m = q.toLowerCase().match(/^employees in (.+)$/);
    if (!m) {
      setMessages((m) => [
        ...m,
        { role: "bot", text: "Try: employees in Bangalore" },
      ]);
      return;
    }

    const city = m[1];
    setLoading(true);
    try {
      const res = await fetch(
        `http://localhost:3001/api/employees?city=${encodeURIComponent(
          city
        )}&limit=10`
      );
      const data = await res.json();

      // if array -> render as table; else show text
      setMessages((m) => [
        ...m,
        Array.isArray(data)
          ? { role: "bot", rows: data } // special: table
          : { role: "bot", text: JSON.stringify(data) }, // fallback
      ]);
    } catch (e) {
      setMessages((m) => [
        ...m,
        { role: "bot", text: "Server error. Check console." },
      ]);
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        maxWidth: 900,
        margin: "32px auto",
        fontFamily: "system-ui",
        color: "#eaeaea",
      }}
    >
      <h2>Employee Chat (no‑AI)</h2>

      <div
        style={{
          border: "1px solid #444",
          minHeight: 320,
          padding: 12,
          background: "#1b1b1b",
        }}
      >
        {messages.map((m, i) => (
          <div key={i} style={{ marginBottom: 14 }}>
            <div style={{ fontWeight: 700 }}>
              {m.role === "user" ? "You" : "Bot"}:
            </div>
            {"rows" in m ? <EmployeeList rows={m.rows} /> : <div>{m.text}</div>}
          </div>
        ))}
        {loading && <div>Loading…</div>}
      </div>

      <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Try: employees in Bangalore"
          style={{
            flex: 1,
            padding: 10,
            background: "#111",
            color: "#eaeaea",
            border: "1px solid #444",
          }}
        />
        <button
          onClick={send}
          style={{ padding: "10px 18px", borderRadius: 6 }}
        >
          Send
        </button>
      </div>
    </div>
  );
}

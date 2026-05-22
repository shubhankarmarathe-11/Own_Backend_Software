import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Terminal,
  Copy,
  Check,
  ChevronDown,
  ChevronRight,
  Database,
  ShieldAlert,
  Server,
  Info,
  Upload,
  ArrowLeft,
  Link2,
} from "lucide-react";
import { Button } from "../components/ui/button";

// ─── Types ────────────────────────────────────────────────────────────────────

interface ApiEndpointProps {
  method: "GET" | "POST" | "PATCH" | "DELETE";
  path: string;
  description: string;
  params?: { name: string; description: string }[];
  headers?: { name: string; description: string }[];
  requestBody?: string;
  responseExample: string;
  note?: string;
}

// ─── Method Badge ─────────────────────────────────────────────────────────────

const MethodBadge = ({ method }: { method: string }) => {
  const colors: Record<string, string> = {
    GET: "bg-blue-100 text-blue-700 border-blue-200",
    POST: "bg-green-100 text-green-700 border-green-200",
    PATCH: "bg-yellow-100 text-yellow-700 border-yellow-200",
    DELETE: "bg-red-100 text-red-700 border-red-200",
  };
  return (
    <span
      className={`px-2 py-0.5 text-xs font-bold rounded-md border shrink-0 ${colors[method] ?? "bg-gray-100 text-gray-700 border-gray-200"}`}
    >
      {method}
    </span>
  );
};

// ─── Code Block ───────────────────────────────────────────────────────────────

const CodeBlock = ({ code }: { code: string }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="relative group">
      <button
        onClick={handleCopy}
        className="absolute right-2 top-2 h-7 w-7 flex items-center justify-center rounded-md bg-white/10 hover:bg-white/25 border border-gray-600 text-gray-400 hover:text-white transition-colors"
      >
        {copied ? (
          <Check className="h-3.5 w-3.5" />
        ) : (
          <Copy className="h-3.5 w-3.5" />
        )}
      </button>
      <pre className="bg-gray-950 text-gray-100 p-4 rounded-xl overflow-x-auto text-xs font-mono border border-gray-800 shadow-inner leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  );
};

// ─── Endpoint Card ────────────────────────────────────────────────────────────

const EndpointCard = ({ endpoint }: { endpoint: ApiEndpointProps }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
      <div
        className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-3 min-w-0">
          <MethodBadge method={endpoint.method} />
          <code className="font-mono text-sm text-gray-800 font-semibold truncate">
            {endpoint.path}
          </code>
        </div>
        <div className="flex items-center gap-3 ml-3 shrink-0">
          <span className="text-xs text-gray-400 hidden sm:block">
            {endpoint.description}
          </span>
          {isOpen ? (
            <ChevronDown className="h-4 w-4 text-gray-400" />
          ) : (
            <ChevronRight className="h-4 w-4 text-gray-400" />
          )}
        </div>
      </div>

      {isOpen && (
        <div className="p-5 border-t border-gray-100 bg-gray-50/50 space-y-5">
          <p className="text-sm text-gray-600">{endpoint.description}</p>

          {endpoint.note && (
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 text-xs text-blue-800">
              <span className="font-semibold">Note: </span>
              {endpoint.note}
            </div>
          )}

          {endpoint.params && endpoint.params.length > 0 && (
            <div>
              <h5 className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">
                URL Parameters
              </h5>
              <div className="space-y-1.5">
                {endpoint.params.map((p) => (
                  <div key={p.name} className="flex items-start gap-2 text-xs">
                    <code className="bg-gray-100 border border-gray-200 px-1.5 py-0.5 rounded font-mono text-gray-700 shrink-0">
                      {p.name}
                    </code>
                    <span className="text-gray-500">{p.description}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {endpoint.headers && endpoint.headers.length > 0 && (
            <div>
              <h5 className="text-xs font-semibold text-purple-600 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                🍪 Required Cookies
              </h5>
              <div className="space-y-1.5">
                {endpoint.headers.map((h) => (
                  <div key={h.name} className="flex items-start gap-2 text-xs">
                    <code className="bg-purple-50 border border-purple-200 px-1.5 py-0.5 rounded font-mono text-purple-700 shrink-0">
                      {h.name}
                    </code>
                    <span className="text-gray-500">{h.description}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {endpoint.requestBody && (
            <div>
              <h5 className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Terminal className="h-3.5 w-3.5" /> Request Body
              </h5>
              <CodeBlock code={endpoint.requestBody} />
            </div>
          )}

          <div>
            <h5 className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Check className="h-3.5 w-3.5 text-green-500" /> Response
            </h5>
            <CodeBlock code={endpoint.responseExample} />
          </div>
        </div>
      )}
    </div>
  );
};

// ─── Section Wrapper ──────────────────────────────────────────────────────────

const Section = ({
  title,
  icon,
  note,
  noteColor = "amber",
  endpoints,
}: {
  title: string;
  icon: React.ReactNode;
  note?: React.ReactNode;
  noteColor?: "amber" | "emerald" | "blue" | "indigo";
  endpoints: ApiEndpointProps[];
}) => {
  const noteColors: Record<string, string> = {
    amber: "bg-amber-50 border-amber-200 text-amber-900",
    emerald: "bg-emerald-50 border-emerald-200 text-emerald-900",
    blue: "bg-blue-50 border-blue-200 text-blue-900",
    indigo: "bg-indigo-50 border-indigo-200 text-indigo-900",
  };
  return (
    <div>
      <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
        {icon}
        {title}
      </h3>
      {note && (
        <div
          className={`border rounded-xl p-4 mb-5 text-sm ${noteColors[noteColor]}`}
        >
          {note}
        </div>
      )}
      <div className="space-y-3">
        {endpoints.map((ep, i) => (
          <EndpointCard key={i} endpoint={ep} />
        ))}
      </div>
    </div>
  );
};

// ─── Main Page ────────────────────────────────────────────────────────────────

export function ApiDocs() {
  const { id: projectId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_API_URL || "/api";

  if (!projectId) {
    navigate("/dashboard");
    return null;
  }

  // ── Token Cookie helper ──────────────────────────────────────────────────────
  const projectCookies = [
    {
      name: "host_project_auth_refresh",
      description:
        "Refresh token received after login/register. Long-lived (7 days).",
    },
    {
      name: "host_project_auth_access",
      description:
        "Access token. Short-lived (1 hour). Regenerate via /projecttoken/generate/accesstoken when expired.",
    },
  ];

  // ── Auth Endpoints ──────────────────────────────────────────────────────────
  const authEndpoints: ApiEndpointProps[] = [
    {
      method: "POST",
      path: `/projectauth/register/${projectId}`,
      description:
        "Register a new user in your project. Returns refresh & access tokens as cookies.",
      params: [
        {
          name: ":projectId",
          description: "Your project ID (auto-filled above)",
        },
      ],
      requestBody: JSON.stringify(
        {
          AuthData: {
            Email: "user@example.com",
            Name: "John",
            UserName: "john_doe",
            Password: "Abcd@1234",
            Phone: "9876543210",
            Identifiers: ["Email"],
          },
        },
        null,
        2,
      ),
      responseExample: JSON.stringify(
        {
          res: "User Created. RefreshToken - <rtoken> \nAccessToken - <atoken>",
        },
        null,
        2,
      ),
      note: "Only include fields you need. Identifiers = which fields are used for login. The response returns both tokens — store them as cookies (host_project_auth_refresh & host_project_auth_access) for all subsequent requests.",
    },
    {
      method: "POST",
      path: `/projectauth/login/${projectId}`,
      description:
        "Authenticate an existing project user. Returns refresh & access tokens.",
      params: [{ name: ":projectId", description: "Your project ID" }],
      requestBody: JSON.stringify(
        {
          LoginAuthData: {
            Email: "user@example.com",
            Password: "Abcd@1234",
            Identifiers: ["Email"],
          },
        },
        null,
        2,
      ),
      responseExample: JSON.stringify(
        { res: "User Found. RefreshToken - <rtoken> \nAccessToken - <atoken>" },
        null,
        2,
      ),
      note: "On success, set the returned tokens as cookies: host_project_auth_refresh and host_project_auth_access. PuserId is embedded in the tokens — you do NOT need to send it manually.",
    },
    {
      method: "PATCH",
      path: `/projectauth/update/${projectId}`,
      description:
        "Update authentication details for an existing project user.",
      params: [{ name: ":projectId", description: "Your project ID" }],
      headers: projectCookies,
      requestBody: JSON.stringify(
        {
          AuthData: {
            Email: "new@example.com",
            Password: "NewPass@5678",
            Identifiers: ["Email"],
            PrevIdentifiers: ["Email"],
          },
        },
        null,
        2,
      ),
      responseExample: JSON.stringify(
        { res: "User Auth Data Updated" },
        null,
        2,
      ),
      note: "PuserId is automatically extracted from the host_project_auth_refresh cookie — do NOT send it in the body. PrevIdentifiers (array) is required to identify old data.",
    },
    {
      method: "DELETE",
      path: `/projectauth/delete/${projectId}`,
      description: "Permanently remove a user from your project.",
      params: [{ name: ":projectId", description: "Your project ID" }],
      headers: projectCookies,
      responseExample: JSON.stringify({ res: "User Removed" }, null, 2),
      note: "PuserId is automatically extracted from the host_project_auth_refresh cookie — do NOT send it in the body.",
    },
  ];

  // ── UserData Endpoints ──────────────────────────────────────────────────────
  const dataEndpoints: ApiEndpointProps[] = [
    {
      method: "POST",
      path: `/projectdata/add/${projectId}`,
      description: "Store arbitrary JSON data for a specific project user.",
      params: [{ name: ":projectId", description: "Your project ID" }],
      headers: projectCookies,
      requestBody: JSON.stringify(
        {
          UserData: {
            preferences: { theme: "dark", notifications: true },
            score: 1250,
          },
        },
        null,
        2,
      ),
      responseExample: '"Data inserted"',
      note: 'PuserId is extracted from your host_project_auth_refresh cookie automatically. Your data must be wrapped in a root key named "UserData". Any valid JSON object is accepted.',
    },
    {
      method: "GET",
      path: `/projectdata/retrive/${projectId}`,
      description: "Retrieve all stored data for a specific project user.",
      params: [{ name: ":projectId", description: "Your project ID" }],
      headers: projectCookies,
      responseExample: JSON.stringify(
        {
          data: {
            preferences: { theme: "dark", notifications: true },
            score: 1250,
          },
        },
        null,
        2,
      ),
      note: "PuserId is extracted from the host_project_auth_refresh cookie automatically. No request body needed.",
    },
  ];

  // ── File Upload Endpoints ───────────────────────────────────────────────────
  const uploadEndpoints: ApiEndpointProps[] = [
    {
      method: "POST",
      path: `/uploadfile/upload/${projectId}`,
      description:
        "Upload a file for a project user. Stored on S3 and a key is saved to the user record.",
      params: [{ name: ":projectId", description: "Your project ID" }],
      headers: projectCookies,
      requestBody: `// Send as multipart/form-data
// Field name must be exactly: "file"
// PuserId is read from your cookie automatically
//
// Example (fetch):
const formData = new FormData();
formData.append('file', fileInputElement.files[0]);

fetch(\`${baseUrl}/uploadfile/upload/${projectId}\`, {
  method: 'POST',
  credentials: 'include', // sends cookies automatically
  body: formData,
});`,
      responseExample: '"file uploaded"',
      note: 'Content-Type must be multipart/form-data. The file field name must be "file". PuserId is extracted from the host_project_auth_refresh cookie — do NOT send it as a form field.',
    },
    {
      method: "GET",
      path: `/uploadfile/fetchall/${projectId}`,
      description: "List all file keys stored for a project user.",
      params: [{ name: ":projectId", description: "Your project ID" }],
      headers: projectCookies,
      responseExample: JSON.stringify(
        { keys: ["uploads/abc123.jpg", "uploads/doc456.pdf"] },
        null,
        2,
      ),
      note: "PuserId is extracted from the host_project_auth_refresh cookie. No request body needed.",
    },
    {
      method: "GET",
      path: `/uploadfile/getfileurl/${projectId}/:key`,
      description: "Get a temporary signed S3 URL to access a specific file.",
      params: [
        { name: ":projectId", description: "Your project ID" },
        { name: ":key", description: "The file key returned from fetchall" },
      ],
      headers: projectCookies,
      responseExample: JSON.stringify(
        { url: "https://s3.amazonaws.com/bucket/...?X-Amz-Signature=..." },
        null,
        2,
      ),
      note: "PuserId is extracted from the host_project_auth_refresh cookie. No request body needed.",
    },
    {
      method: "DELETE",
      path: `/uploadfile/deletefile/${projectId}/:key`,
      description:
        "Delete a file from S3 and remove its key from the user record.",
      params: [
        { name: ":projectId", description: "Your project ID" },
        { name: ":key", description: "The file key to delete" },
      ],
      headers: projectCookies,
      responseExample: '"file removed"',
      note: "PuserId is extracted from the host_project_auth_refresh cookie. No request body needed.",
    },
  ];

  // ── OAuth Endpoints ─────────────────────────────────────────────────────────
  const oauthEndpoints: ApiEndpointProps[] = [
    {
      method: "POST",
      path: `/oauth/validatetoken/${projectId}`,
      description:
        "Validate a Google OAuth ID token for a project user. Use this to authenticate users via Google Sign-In in your own app.",
      params: [{ name: ":projectId", description: "Your project ID" }],
      requestBody: JSON.stringify(
        {
          google_token: "eyJhbGciOiJSUzI1NiIsImtpZCI6IjEyMzQifQ...",
          GOOGLE_CLIENT_ID: "eyJhbGciOiJSUzI1NiIsImtpZCI6IjEyMzQifQ...",
        },
        null,
        2,
      ),
      responseExample: JSON.stringify(
        { res: "Token valid", userId: "64fc1b2..." },
        null,
        2,
      ),
      note: "Obtain the Google ID token client-side using the Google Identity Services library, then pass it here for server-side validation.",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-gray-50 font-sans">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="h-8 px-2.5 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100 gap-1.5 font-medium shrink-0"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Back</span>
          </Button>
          <div className="w-px h-5 bg-gray-200" />
          <div className="flex-1 min-w-0">
            <h1 className="text-base font-bold text-gray-900">
              API Documentation
            </h1>
            <p className="text-xs text-gray-400 font-mono truncate">
              Project: {projectId}
            </p>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-5xl w-full mx-auto px-6 py-10">
        {/* Page Heading */}
        <div className="mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            API Reference
          </h2>
          <p className="text-gray-500 mt-1 text-sm">
            Full endpoint reference for integrating this BAAS project into your
            application.
          </p>
        </div>

        {/* Base URL Banner */}
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm mb-10 flex items-start gap-4">
          <div className="h-9 w-9 bg-gray-100 rounded-xl flex items-center justify-center shrink-0">
            <Server className="h-4.5 w-4.5 text-gray-600" />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-800 mb-1">Base URL</p>
            <p className="text-xs text-gray-500 mb-2">
              Prepend this to every endpoint path below.
            </p>
            <code className="bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-lg text-sm font-mono text-gray-800 inline-block">
              {baseUrl}
            </code>
          </div>
        </div>

        {/* Token Auth Banner */}
        <div className="bg-purple-50 border border-purple-200 rounded-2xl p-5 shadow-sm mb-10 flex items-start gap-4">
          <div className="h-9 w-9 bg-purple-100 rounded-xl flex items-center justify-center shrink-0 text-lg">
            🍪
          </div>
          <div>
            <p className="text-sm font-semibold text-purple-800 mb-1">
              Token-Based Authentication
            </p>
            <p className="text-xs text-purple-700 mb-2">
              After <strong>register</strong> or <strong>login</strong>, set the
              returned tokens as cookies using{" "}
              <code className="bg-purple-100 px-1 rounded font-mono">
                credentials: 'include'
              </code>{" "}
              in fetch /{" "}
              <code className="bg-purple-100 px-1 rounded font-mono">
                withCredentials: true
              </code>{" "}
              in axios. The backend reads <strong>PuserId</strong> directly from
              the refresh token — you never send it manually.
            </p>
            <div className="flex flex-wrap gap-2 text-xs">
              <code className="bg-white border border-purple-200 px-2 py-1 rounded-lg font-mono text-purple-700">
                host_project_auth_refresh
              </code>
              <code className="bg-white border border-purple-200 px-2 py-1 rounded-lg font-mono text-purple-700">
                host_project_auth_access
              </code>
            </div>
          </div>
        </div>

        {/* Sections */}
        <div className="space-y-12">
          {/* Auth */}
          <Section
            title="Authentication"
            icon={<ShieldAlert className="h-5 w-5 text-indigo-500" />}
            noteColor="amber"
            note={
              <>
                <p className="font-semibold flex items-center gap-1.5 mb-2">
                  <Info className="h-4 w-4" /> Key Naming & Validation Rules
                </p>
                <p className="text-xs mb-2">
                  The API enforces <strong>exact capitalized key names</strong>.
                  Only send keys you need.
                </p>
                <div className="grid sm:grid-cols-2 gap-1.5 text-xs">
                  {[
                    { key: "Email", rule: "Valid email address" },
                    { key: "Name", rule: "Letters only, 2–50 chars" },
                    {
                      key: "UserName",
                      rule: "Letters, numbers, _ or . — 3–20 chars, no spaces",
                    },
                    {
                      key: "Password",
                      rule: "Min 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special",
                    },
                    {
                      key: "Phone",
                      rule: "Indian mobile — 10 digits (optional +91 or 0 prefix)",
                    },
                  ].map(({ key, rule }) => (
                    <div key={key} className="flex items-start gap-1.5">
                      <code className="bg-amber-100 px-1 rounded font-mono font-semibold shrink-0">
                        {key}
                      </code>
                      <span className="text-amber-800">{rule}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-3 pt-3 border-t border-amber-200 text-xs space-y-1">
                  <p>
                    <code className="bg-amber-100 px-1 rounded font-mono font-semibold">
                      Identifiers
                    </code>{" "}
                    <span className="text-amber-800">
                      — Required array. Specifies which fields are used as login
                      keys (e.g. <code>["Email"]</code>).
                    </span>
                  </p>

                  <p>
                    <code className="bg-amber-100 px-1 rounded font-mono font-semibold">
                      PrevIdentifiers
                    </code>{" "}
                    <span className="text-amber-800">
                      — Required on Update. Previous identifier keys so the
                      backend can swap them safely.
                    </span>
                  </p>
                </div>
              </>
            }
            endpoints={authEndpoints}
          />

          {/* Token Refresh */}
          <Section
            title="Token Management"
            icon={<Server className="h-5 w-5 text-purple-500" />}
            noteColor="indigo"
            note={
              <>
                <p className="font-semibold flex items-center gap-1.5 mb-1.5">
                  <Info className="h-4 w-4" /> Refresh your Access Token
                </p>
                <p className="text-xs text-indigo-800">
                  The access token expires after <strong>1 hour</strong>. Send
                  the{" "}
                  <code className="bg-indigo-100 px-1 rounded font-mono">
                    host_project_auth_refresh
                  </code>{" "}
                  cookie to generate a new access token without re-logging in.
                </p>
              </>
            }
            endpoints={[
              {
                method: "POST",
                path: "/projecttoken/generate/accesstoken",
                description:
                  "Generate a new access token using the refresh token cookie.",
                headers: [
                  {
                    name: "host_project_auth_refresh",
                    description: "Your long-lived refresh token (7 days)",
                  },
                ],
                responseExample: JSON.stringify({ success: true }, null, 2),
                note: "Call this when you receive a 401 on any protected route. The new host_project_auth_access cookie is set automatically.",
              },
            ]}
          />

          {/* UserData */}
          <Section
            title="User Data"
            icon={<Database className="h-5 w-5 text-emerald-500" />}
            noteColor="emerald"
            note={
              <>
                <p className="font-semibold flex items-center gap-1.5 mb-1.5">
                  <Info className="h-4 w-4" /> Required Root Key
                </p>
                <p className="text-xs text-emerald-800">
                  When adding data via POST, your JSON payload must be wrapped
                  inside a root key named{" "}
                  <code className="bg-emerald-100 px-1 rounded font-mono font-semibold">
                    UserData
                  </code>
                  . Any valid JSON object is accepted as its value.
                </p>
              </>
            }
            endpoints={dataEndpoints}
          />

          {/* File Upload */}
          <Section
            title="File Upload"
            icon={<Upload className="h-5 w-5 text-blue-500" />}
            noteColor="blue"
            note={
              <>
                <p className="font-semibold flex items-center gap-1.5 mb-1.5">
                  <Info className="h-4 w-4" /> S3-Backed File Storage
                </p>
                <p className="text-xs text-blue-800">
                  Files are stored in AWS S3. Use{" "}
                  <code className="bg-blue-100 px-1 rounded font-mono font-semibold">
                    fetchall
                  </code>{" "}
                  to list keys,{" "}
                  <code className="bg-blue-100 px-1 rounded font-mono font-semibold">
                    getfileurl
                  </code>{" "}
                  to get a temporary signed download URL, and{" "}
                  <code className="bg-blue-100 px-1 rounded font-mono font-semibold">
                    deletefile
                  </code>{" "}
                  to remove a file permanently. Upload requests must use{" "}
                  <strong>multipart/form-data</strong> with the field name{" "}
                  <code className="bg-blue-100 px-1 rounded font-mono font-semibold">
                    file
                  </code>
                  .
                </p>
              </>
            }
            endpoints={uploadEndpoints}
          />

          {/* OAuth */}
          <Section
            title="OAuth"
            icon={<Link2 className="h-5 w-5 text-purple-500" />}
            noteColor="indigo"
            note={
              <>
                <p className="font-semibold flex items-center gap-1.5 mb-1.5">
                  <Info className="h-4 w-4" /> Google OAuth Token Validation
                </p>
                <p className="text-xs text-indigo-800">
                  Use the{" "}
                  <a
                    href="https://developers.google.com/identity/gsi/web"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-2 font-semibold"
                  >
                    Google Identity Services
                  </a>{" "}
                  library to obtain an ID token client-side, then pass it to
                  this endpoint for server-side validation.
                </p>
              </>
            }
            endpoints={oauthEndpoints}
          />
        </div>
      </main>
    </div>
  );
}

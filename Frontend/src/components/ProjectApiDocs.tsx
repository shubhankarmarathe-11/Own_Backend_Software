import { useState } from "react";
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
} from "lucide-react";
import { Button } from "./ui/button";

interface ApiEndpointProps {
  method: "GET" | "POST" | "PATCH" | "DELETE";
  path: string;
  description: string;
  requestBody?: string;
  responseExample: string;
}

const MethodBadge = ({ method }: { method: string }) => {
  const colors = {
    GET: "bg-blue-100 text-blue-700 border-blue-200",
    POST: "bg-green-100 text-green-700 border-green-200",
    PATCH: "bg-yellow-100 text-yellow-700 border-yellow-200",
    DELETE: "bg-red-100 text-red-700 border-red-200",
  };
  const colorClass =
    colors[method as keyof typeof colors] ||
    "bg-gray-100 text-gray-700 border-gray-200";

  return (
    <span
      className={`px-2 py-1 text-xs font-bold rounded-md border ${colorClass}`}
    >
      {method}
    </span>
  );
};

const CodeBlock = ({
  code,
  language = "json",
}: {
  code: string;
  language?: string;
}) => {
  const [copied, setCopied] = useState(false);
  language = language;
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group">
      <div className="absolute right-2 top-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handleCopy}
          className="h-8 w-8 p-0 bg-white/10 hover:bg-white/20 border-gray-600 text-gray-300 hover:text-white backdrop-blur-sm"
        >
          {copied ? (
            <Check className="h-4 w-4" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </Button>
      </div>
      <pre className="bg-gray-950 text-gray-100 p-4 rounded-xl overflow-x-auto text-sm font-mono border border-gray-800 shadow-inner">
        <code>{code}</code>
      </pre>
    </div>
  );
};

const ApiEndpointCard = ({ endpoint }: { endpoint: ApiEndpointProps }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-gray-200 rounded-xl mb-4 overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
      <div
        className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-4">
          <MethodBadge method={endpoint.method} />
          <code className="font-mono text-sm text-gray-800 font-semibold">
            {endpoint.path}
          </code>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500 hidden sm:inline-block">
            {endpoint.description}
          </span>
          {isOpen ? (
            <ChevronDown className="h-5 w-5 text-gray-400" />
          ) : (
            <ChevronRight className="h-5 w-5 text-gray-400" />
          )}
        </div>
      </div>

      {isOpen && (
        <div className="p-6 border-t border-gray-100 bg-gray-50/50 space-y-6 animate-in slide-in-from-top-2 duration-200">
          <p className="text-sm text-gray-600 mb-4">{endpoint.description}</p>

          {endpoint.requestBody && (
            <div>
              <h4 className="text-sm font-semibold text-gray-800 mb-2 flex items-center gap-2">
                <Terminal className="h-4 w-4 text-gray-500" /> Request Body
              </h4>
              <CodeBlock code={endpoint.requestBody} />
            </div>
          )}

          <div>
            <h4 className="text-sm font-semibold text-gray-800 mb-2 flex items-center gap-2">
              <Check className="h-4 w-4 text-green-500" /> Expected Response
            </h4>
            <CodeBlock code={endpoint.responseExample} />
          </div>
        </div>
      )}
    </div>
  );
};

export function ProjectApiDocs({ projectId }: { projectId: string }) {
  const baseUrl = "https://baas.shubhankarmarathe.online/api";

  const authEndpoints: ApiEndpointProps[] = [
    {
      method: "POST",
      path: `/projectauth/register/${projectId}`,
      description: "Register a new user in your project",
      requestBody: JSON.stringify(
        {
          AuthData: {
            Email: "test2@gmail.com",
            Name: "shubhankar",
            Password: "Abcd@1234",
            Identifiers: ["Email"],
            uniqueField: ["Email"],
          },
        },
        null,
        2,
      ),
      responseExample: JSON.stringify(
        {
          res: "User Created. UserId - 64fc1b2...",
        },
        null,
        2,
      ),
    },
    {
      method: "POST",
      path: `/projectauth/login/${projectId}`,
      description: "Authenticate an existing project user",
      requestBody: JSON.stringify(
        {
          LoginAuthData: {
            Email: "test@gmail.com",
            Name: "shubhankar",
            Password: "Abcd@1234",
            Identifiers: ["Email"],
          },
        },
        null,
        2,
      ),
      responseExample: JSON.stringify(
        {
          res: "User Found. UserId - 64fc1b2...",
        },
        null,
        2,
      ),
    },
    {
      method: "PATCH",
      path: `/projectauth/update/${projectId}/:PuserId`,
      description: "Update authentication details for a project user",
      requestBody: JSON.stringify(
        {
          AuthData: {
            Email: "test2@gmail.com",
            Name: "shubhankar",
            Password: "Abcd@1234",
            Identifiers: ["Email"],
            uniqueField: ["Email"],
          },
        },
        null,
        2,
      ),
      responseExample: JSON.stringify(
        {
          res: "User Auth Data Updated",
        },
        null,
        2,
      ),
    },
    {
      method: "DELETE",
      path: `/projectauth/delete/${projectId}/:PuserId`,
      description: "Remove a user from your project",
      responseExample: JSON.stringify(
        {
          res: "User Removed",
        },
        null,
        2,
      ),
    },
  ];

  const dataEndpoints: ApiEndpointProps[] = [
    {
      method: "POST",
      path: `/projectdata/add/${projectId}/:PuserId`,
      description: "Store arbitrary JSON data for a specific user",
      requestBody: JSON.stringify(
        {
          UserData: {
            preferences: {
              theme: "dark",
              notifications: true,
            },
            score: 1250,
          },
        },
        null,
        2,
      ),
      responseExample: "Data inserted", // The backend actually returns a plain string here
    },
    {
      method: "GET",
      path: `/projectdata/retrive/${projectId}/:PuserId`,
      description: "Retrieve all stored data for a specific user",
      responseExample: JSON.stringify(
        {
          data: {
            preferences: {
              theme: "dark",
              notifications: true,
            },
            score: 1250,
          },
        },
        null,
        2,
      ),
    },
  ];

  return (
    <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-md mt-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          API Integration Guidelines
        </h2>
        <p className="text-gray-500">
          Use these endpoints to integrate authentication and data storage into
          your own frontend application.
        </p>
      </div>

      <div className="mb-8">
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-start gap-4">
          <div className="bg-blue-100 p-2 rounded-lg text-blue-600 mt-1">
            <Server className="h-5 w-5" />
          </div>
          <div>
            <h4 className="font-semibold text-blue-900">Base URL</h4>
            <p className="text-sm text-blue-700 mt-1 mb-2">
              Prepend this base URL to all API requests below:
            </p>
            <code className="bg-white px-3 py-1.5 rounded-md border border-blue-200 text-sm font-mono text-blue-800 shadow-sm inline-block">
              {baseUrl}
            </code>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <ShieldAlert className="h-5 w-5 text-indigo-500" /> Authentication
          </h3>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
            <h4 className="font-semibold text-amber-900 flex items-center gap-2">
              <Info className="h-4 w-4" /> Important: Key Naming & Validation
            </h4>
            <p className="text-sm text-amber-800 mt-2">
              The authentication API strictly enforces capitalized keys and
              formats. You <strong>must</strong> use these exact keys if
              providing these fields:
            </p>
            <ul className="list-disc list-inside text-sm text-amber-800 mt-2 space-y-1 ml-1">
              <li>
                <code className="font-semibold font-mono bg-amber-100 px-1 rounded">
                  Email
                </code>
                : Valid email address
              </li>
              <li>
                <code className="font-semibold font-mono bg-amber-100 px-1 rounded">
                  Name
                </code>
                : Only letters & 2-50 characters
              </li>
              <li>
                <code className="font-semibold font-mono bg-amber-100 px-1 rounded">
                  UserName
                </code>
                : Letters, numbers, _, ., 3-20 chars (no spaces)
              </li>
              <li>
                <code className="font-semibold font-mono bg-amber-100 px-1 rounded">
                  Password
                </code>
                : Min 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special
                char
              </li>
              <li>
                <code className="font-semibold font-mono bg-amber-100 px-1 rounded">
                  Phone
                </code>
                : Indian mobile numbers (10 digits)
              </li>
            </ul>

            <p className="text-sm font-semibold text-amber-900 mt-4 mb-2">
              Required Metadata Arrays:
            </p>
            <ul className="list-disc list-inside text-sm text-amber-800 space-y-1 ml-1">
              <li>
                <code className="font-semibold font-mono bg-amber-100 px-1 rounded">
                  Identifiers
                </code>
                : Array of strings specifying which keys are used for login
                (e.g., <code className="text-xs">["Email"]</code>). Required for
                Register & Login.
              </li>
              <li>
                <code className="font-semibold font-mono bg-amber-100 px-1 rounded">
                  uniqueField
                </code>
                : Array of strings specifying which keys must be unique in the
                database. Required for Register.
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            {authEndpoints.map((endpoint, i) => (
              <ApiEndpointCard key={i} endpoint={endpoint} />
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Database className="h-5 w-5 text-emerald-500" /> User Data
          </h3>

          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 mb-6">
            <h4 className="font-semibold text-emerald-900 flex items-center gap-2">
              <Info className="h-4 w-4" /> Important: Required Root Key
            </h4>
            <p className="text-sm text-emerald-800 mt-2">
              When adding user data via POST, you <strong>must</strong> wrap
              your arbitrary JSON data inside a root key named{" "}
              <code className="font-semibold font-mono bg-emerald-100 px-1 rounded">
                UserData
              </code>
              . The backend specifically looks for this exact key.
            </p>
          </div>

          <div className="space-y-4">
            {dataEndpoints.map((endpoint, i) => (
              <ApiEndpointCard key={i} endpoint={endpoint} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

import ReactMarkdown from "react-markdown"

interface MarkdownRendererProps {
  content: string
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <ReactMarkdown
      className="prose prose-sm dark:prose-invert max-w-none break-words"
      components={{
        a: ({ node, ...props }) => (
          <a {...props} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer" />
        ),
        p: ({ node, ...props }) => <p {...props} className="mb-2 last:mb-0" />,
        ul: ({ node, ...props }) => <ul {...props} className="list-disc pl-4 mb-2" />,
        ol: ({ node, ...props }) => <ol {...props} className="list-decimal pl-4 mb-2" />,
        li: ({ node, ...props }) => <li {...props} className="mb-1" />,
        h1: ({ node, ...props }) => <h1 {...props} className="text-xl font-bold mb-2 mt-4" />,
        h2: ({ node, ...props }) => <h2 {...props} className="text-lg font-bold mb-2 mt-3" />,
        h3: ({ node, ...props }) => <h3 {...props} className="text-md font-bold mb-2 mt-3" />,
        h4: ({ node, ...props }) => <h4 {...props} className="font-bold mb-2 mt-3" />,
        code: ({ node, ...props }) => <code {...props} className="bg-muted px-1 py-0.5 rounded text-sm font-mono" />,
        pre: ({ node, ...props }) => (
          <pre {...props} className="bg-muted p-2 rounded overflow-x-auto text-sm font-mono mb-2" />
        ),
        blockquote: ({ node, ...props }) => (
          <blockquote {...props} className="border-l-4 border-muted pl-4 italic mb-2" />
        ),
        hr: ({ node, ...props }) => <hr {...props} className="my-4 border-muted" />,
        table: ({ node, ...props }) => (
          <div className="overflow-x-auto mb-2">
            <table {...props} className="min-w-full divide-y divide-border" />
          </div>
        ),
        thead: ({ node, ...props }) => <thead {...props} className="bg-muted" />,
        tbody: ({ node, ...props }) => <tbody {...props} className="divide-y divide-border" />,
        tr: ({ node, ...props }) => <tr {...props} className="hover:bg-muted/50" />,
        th: ({ node, ...props }) => (
          <th
            {...props}
            className="px-3 py-2 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider"
          />
        ),
        td: ({ node, ...props }) => <td {...props} className="px-3 py-2 whitespace-nowrap" />,
      }}
    >
      {content}
    </ReactMarkdown>
  )
}

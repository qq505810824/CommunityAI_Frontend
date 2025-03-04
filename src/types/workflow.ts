import type { Edge as ReactFlowEdge } from 'reactflow';
import { VisionFile } from './common';

export type PromptConfig = {
    prompt_template: string;
    prompt_variables: PromptVariable[];
};

export type VisionSettings = {
    enabled: boolean;
    number_limits: number;
    detail: Resolution;
    transfer_methods: TransferMethod[];
    image_file_size_limit?: number | string;
};

export enum TransferMethod {
    all = 'all',
    local_file = 'local_file',
    remote_url = 'remote_url'
}

export enum Resolution {
    low = 'low',
    high = 'high'
}

export type PromptVariable = {
    key: string;
    name: string;
    type: string; // "string" | "number" | "select",
    default?: string | number;
    required?: boolean;
    options?: string[];
    max_length?: number;
    is_context_var?: boolean;
    enabled?: boolean;
    config?: Record<string, any>;
    icon?: string;
    icon_background?: string;
};

export type TextTypeFormItem = {
    default: string;
    label: string;
    variable: string;
    required: boolean;
    max_length: number;
};

export type SelectTypeFormItem = {
    default: string;
    label: string;
    variable: string;
    required: boolean;
    options: string[];
};

export type ParagraphTypeFormItem = {
    default: string;
    label: string;
    variable: string;
    required: boolean;
};

export type UserInputFormItem =
    | {
          'text-input': TextTypeFormItem;
      }
    | {
          select: SelectTypeFormItem;
      }
    | {
          paragraph: TextTypeFormItem;
      };

export type NodeTracing = {
    id: string;
    index: number;
    predecessor_node_id: string;
    node_id: string;
    node_type: BlockEnum;
    title: string;
    inputs: any;
    process_data: any;
    outputs?: any;
    status: string;
    error?: string;
    elapsed_time: number;
    execution_metadata: {
        total_tokens: number;
        total_price: number;
        currency: string;
    };
    created_at: number;
    created_by: {
        id: string;
        name: string;
        email: string;
    };
    finished_at: number;
    extras?: any;
    expand?: boolean; // for UI
};

export type FetchWorkflowDraftResponse = {
    id: string;
    graph: {
        nodes: Node[];
        edges: Edge[];
        viewport?: Viewport;
    };
    features?: any;
    created_at: number;
    created_by: {
        id: string;
        name: string;
        email: string;
    };
    hash: string;
    updated_at: number;
};

export type NodeTracingListResponse = {
    data: NodeTracing[];
};

export type WorkflowStartedResponse = {
    task_id: string;
    workflow_run_id: string;
    event: string;
    data: {
        id: string;
        workflow_id: string;
        sequence_number: number;
        created_at: number;
    };
};

export type WorkflowFinishedResponse = {
    task_id: string;
    workflow_run_id: string;
    event: string;
    data: {
        id: string;
        workflow_id: string;
        status: string;
        outputs: any;
        error: string;
        elapsed_time: number;
        total_tokens: number;
        total_steps: number;
        created_at: number;
        finished_at: number;
    };
};

export type NodeStartedResponse = {
    task_id: string;
    workflow_run_id: string;
    event: string;
    data: {
        id: string;
        node_id: string;
        node_type: string;
        index: number;
        predecessor_node_id?: string;
        inputs: any;
        created_at: number;
        extras?: any;
    };
};

export type NodeFinishedResponse = {
    task_id: string;
    workflow_run_id: string;
    event: string;
    data: {
        id: string;
        node_id: string;
        node_type: string;
        index: number;
        predecessor_node_id?: string;
        inputs: any;
        process_data: any;
        outputs: any;
        status: string;
        error: string;
        elapsed_time: number;
        execution_metadata: {
            total_tokens: number;
            total_price: number;
            currency: string;
        };
        created_at: number;
    };
};

export type TextChunkResponse = {
    task_id: string;
    workflow_run_id: string;
    event: string;
    data: {
        text: string;
    };
};

export type TextReplaceResponse = {
    task_id: string;
    workflow_run_id: string;
    event: string;
    data: {
        text: string;
    };
};

export type WorkflowRunHistory = {
    id: string;
    sequence_number: number;
    version: string;
    conversation_id?: string;
    message_id?: string;
    graph: {
        nodes: Node[];
        edges: Edge[];
        viewport?: Viewport;
    };
    inputs: Record<string, string>;
    status: string;
    outputs: Record<string, any>;
    error?: string;
    elapsed_time: number;
    total_tokens: number;
    total_steps: number;
    created_at: number;
    finished_at: number;
    created_by_account: {
        id: string;
        name: string;
        email: string;
    };
};
export type WorkflowRunHistoryResponse = {
    data: WorkflowRunHistory[];
};

export type ChatRunHistoryResponse = {
    data: WorkflowRunHistory[];
};

export type NodesDefaultConfigsResponse = {
    type: string;
    config: any;
}[];

export type Viewport = {
    x: number;
    y: number;
    zoom: number;
};

export type Edge = ReactFlowEdge<CommonEdgeType>;

export type CommonEdgeType = {
    _hovering?: boolean;
    _connectedNodeIsHovering?: boolean;
    _connectedNodeIsSelected?: boolean;
    _runned?: boolean;
    _isBundled?: boolean;
    sourceType: BlockEnum;
    targetType: BlockEnum;
};

export enum BlockEnum {
    Start = 'start',
    End = 'end',
    Answer = 'answer',
    LLM = 'llm',
    KnowledgeRetrieval = 'knowledge-retrieval',
    QuestionClassifier = 'question-classifier',
    IfElse = 'if-else',
    Code = 'code',
    TemplateTransform = 'template-transform',
    HttpRequest = 'http-request',
    VariableAssigner = 'variable-assigner',
    Tool = 'tool'
}

export type MessageReplace = {
    id: string;
    task_id: string;
    answer: string;
    conversation_id: string;
};

export type AnnotationReply = {
    id: string;
    task_id: string;
    answer: string;
    conversation_id: string;
    annotation_id: string;
    annotation_author_name: string;
};

export type ThoughtItem = {
    id: string;
    tool: string; // plugin or dataset. May has multi.
    thought: string;
    tool_input: string;
    message_id: string;
    observation: string;
    position: number;
    files?: string[];
    message_files?: VisionFile[];
};

export type MessageEnd = {
    id: string;
    metadata: {
        retriever_resources?: any[];
        annotation_reply: {
            id: string;
            account: {
                id: string;
                name: string;
            };
        };
    };
};

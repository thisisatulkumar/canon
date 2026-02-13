export interface Notification {
    id: number;
    roll_number: string;
    type: string;
    meta: any;
    is_read: boolean;
    created_at?: string;
}

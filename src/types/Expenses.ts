export interface Expenses {
  data: {
    id: string;
    name: string;
    image_url: string;
    amount: number;
    dueDate: Date;
    isPaid: boolean;
    remainingBalance: number;
  }[] | undefined;
}

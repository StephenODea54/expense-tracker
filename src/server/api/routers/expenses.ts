import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const expensesRouter = createTRPCRouter({
    // Get all expenses
    getAll: publicProcedure.query(async ({ ctx }) => {
      try {
        return await ctx.prisma.expenses.findMany({
          select: {
            id: true,
            name: true,
            amount: true,
            dueDate: true,
            isPaid: true,
            remainingBalance: true,
          }
        });
      } catch (error) {
        console.log("Error in retrieving all expenses: ", error);
      }
    }),

    // Get expense by id
    getOne: publicProcedure
      .input(
        z.object({
          id: z.string({
            required_error: "An"
          }),
        }),
      )
      .query(async ({ ctx, input }) => {
        try {
          return await ctx.prisma.expenses.findUnique({
            where: {
              id: input.id,
            },
          });
        } catch (error) {
          console.log("Error in retrieving expense: ", error);
        }
    }),

    // Create new expense
    postExpense: publicProcedure
      .input(
        z.object({
          name: z.string({
            required_error: "Expense name is required.",
            invalid_type_error: "The Name must be a string.",
          }),
          amount: z.number({
            required_error: "An amount is required.",
            invalid_type_error: "Amount must be a number",
          })
            .positive({ message: "The amount must be greater than zero."}),
          dueDate: z.date({
            required_error: "A due date is required.",
            invalid_type_error: "That's not a date, it's a rock!",
          }),
          isPaid: z.boolean({
            required_error: "isPaid is required.",
            invalid_type_error: "isPaid must be a boolean",
          }),
          remainingBalance: z.number({
            required_error: "A remaining balance must be specified.",
            invalid_type_error: "Remaining balance must be a number.",
          })
            .nonnegative({ message: "The remaining balance cannot be less than zero."}),
        }),
      )
      .mutation(async ({ ctx, input }) => {
        try {
          await ctx.prisma.expenses.create({
            data: {
              name: input.name,
              amount: input.amount,
              dueDate: input.dueDate,
              isPaid: input.isPaid,
              remainingBalance: input.remainingBalance,
            }
          });
        } catch (error) {
          console.log("Error in creating new expense: ", error)
        }
      }),

      // Update an existing expense
      updateExpense: publicProcedure
      .input(
        z.object({
          id: z.string({
            required_error: "I need an ID to update!",
            invalid_type_error: "ID must be a string!",
          }),
          name: z.string({
            required_error: "Expense name is required.",
            invalid_type_error: "The Name must be a string.",
          }),
          amount: z.number({
            required_error: "An amount is required.",
            invalid_type_error: "Amount must be a number",
          })
            .positive({ message: "The amount must be greater than zero."}),
          dueDate: z.date({
            required_error: "A due date is required.",
            invalid_type_error: "That's not a date!",
          }),
          isPaid: z.boolean({
            required_error: "isPaid is required.",
            invalid_type_error: "isPaid must be a boolean",
          }),
          remainingBalance: z.number({
            required_error: "A remaining balance must be specified.",
            invalid_type_error: "Remaining balance must be a number.",
          })
            .nonnegative({ message: "The remaining balance cannot be less than zero."}),
        }),
      )
      .mutation(async ({ ctx, input }) => {
        try {
          await ctx.prisma.expenses.update({
            where: {
              id: input.id,
            },
            data: {
              name: input.name,
              amount: input.amount,
              dueDate: input.dueDate,
              isPaid: input.isPaid,
              remainingBalance: input.remainingBalance,
            }
          });
        } catch (error) {
          console.log("Error in creating new expense: ", error)
        }
      }),

      // Delete an existing expense
      deleteExpense: publicProcedure
        .input(
          z.object({
            id: z.string({
              required_error: "I need an ID!",
              invalid_type_error: "The ID must be a string",
            }),
          })
        )
        .mutation(async ({ ctx, input }) => {
          try {
            await ctx.prisma.expenses.delete({
              where: {
                id: input.id,
              },
            });
          } catch (error) {
            console.log("Error when trying to delete expense: ", error)
          }
        }),
});

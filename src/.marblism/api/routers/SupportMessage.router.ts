/* eslint-disable */
import { type RouterFactory, type ProcBuilder, type BaseConfig, db } from ".";
import * as _Schema from '@zenstackhq/runtime/zod/input';
const $Schema: typeof _Schema = (_Schema as any).default ?? _Schema;
import { checkRead, checkMutate } from '../helper';
import type { Prisma } from '@prisma/client';
import type { UseTRPCMutationOptions, UseTRPCMutationResult, UseTRPCQueryOptions, UseTRPCQueryResult, UseTRPCInfiniteQueryOptions, UseTRPCInfiniteQueryResult } from '@trpc/react-query/shared';
import type { TRPCClientErrorLike } from '@trpc/client';
import type { AnyRouter } from '@trpc/server';

export default function createRouter<Config extends BaseConfig>(router: RouterFactory<Config>, procedure: ProcBuilder<Config>) {
    return router({

        createMany: procedure.input($Schema.SupportMessageInputSchema.createMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).supportMessage.createMany(input as any))),

        create: procedure.input($Schema.SupportMessageInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).supportMessage.create(input as any))),

        deleteMany: procedure.input($Schema.SupportMessageInputSchema.deleteMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).supportMessage.deleteMany(input as any))),

        delete: procedure.input($Schema.SupportMessageInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).supportMessage.delete(input as any))),

        findFirst: procedure.input($Schema.SupportMessageInputSchema.findFirst).query(({ ctx, input }) => checkRead(db(ctx).supportMessage.findFirst(input as any))),

        findMany: procedure.input($Schema.SupportMessageInputSchema.findMany).query(({ ctx, input }) => checkRead(db(ctx).supportMessage.findMany(input as any))),

        findUnique: procedure.input($Schema.SupportMessageInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).supportMessage.findUnique(input as any))),

        updateMany: procedure.input($Schema.SupportMessageInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).supportMessage.updateMany(input as any))),

        update: procedure.input($Schema.SupportMessageInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).supportMessage.update(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    createMany: {

        useMutation: <T extends Prisma.SupportMessageCreateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.SupportMessageCreateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.SupportMessageCreateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.SupportMessageCreateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    create: {

        useMutation: <T extends Prisma.SupportMessageCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.SupportMessageCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.SupportMessageGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.SupportMessageGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.SupportMessageCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.SupportMessageCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.SupportMessageGetPayload<T>, Context>) => Promise<Prisma.SupportMessageGetPayload<T>>
            };

    };
    deleteMany: {

        useMutation: <T extends Prisma.SupportMessageDeleteManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.SupportMessageDeleteManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.SupportMessageDeleteManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.SupportMessageDeleteManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    delete: {

        useMutation: <T extends Prisma.SupportMessageDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.SupportMessageDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.SupportMessageGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.SupportMessageGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.SupportMessageDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.SupportMessageDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.SupportMessageGetPayload<T>, Context>) => Promise<Prisma.SupportMessageGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.SupportMessageFindFirstArgs, TData = Prisma.SupportMessageGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.SupportMessageFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.SupportMessageGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.SupportMessageFindFirstArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.SupportMessageFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.SupportMessageGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.SupportMessageGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.SupportMessageFindManyArgs, TData = Array<Prisma.SupportMessageGetPayload<T>>>(
            input: Prisma.SelectSubset<T, Prisma.SupportMessageFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.SupportMessageGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.SupportMessageFindManyArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.SupportMessageFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.SupportMessageGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.SupportMessageGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.SupportMessageFindUniqueArgs, TData = Prisma.SupportMessageGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.SupportMessageFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.SupportMessageGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.SupportMessageFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.SupportMessageFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.SupportMessageGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.SupportMessageGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    updateMany: {

        useMutation: <T extends Prisma.SupportMessageUpdateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.SupportMessageUpdateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.SupportMessageUpdateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.SupportMessageUpdateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    update: {

        useMutation: <T extends Prisma.SupportMessageUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.SupportMessageUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.SupportMessageGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.SupportMessageGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.SupportMessageUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.SupportMessageUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.SupportMessageGetPayload<T>, Context>) => Promise<Prisma.SupportMessageGetPayload<T>>
            };

    };
}

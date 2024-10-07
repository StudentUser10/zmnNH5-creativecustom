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

        createMany: procedure.input($Schema.CartInputSchema.createMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).cart.createMany(input as any))),

        create: procedure.input($Schema.CartInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).cart.create(input as any))),

        deleteMany: procedure.input($Schema.CartInputSchema.deleteMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).cart.deleteMany(input as any))),

        delete: procedure.input($Schema.CartInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).cart.delete(input as any))),

        findFirst: procedure.input($Schema.CartInputSchema.findFirst).query(({ ctx, input }) => checkRead(db(ctx).cart.findFirst(input as any))),

        findMany: procedure.input($Schema.CartInputSchema.findMany).query(({ ctx, input }) => checkRead(db(ctx).cart.findMany(input as any))),

        findUnique: procedure.input($Schema.CartInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).cart.findUnique(input as any))),

        updateMany: procedure.input($Schema.CartInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).cart.updateMany(input as any))),

        update: procedure.input($Schema.CartInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).cart.update(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    createMany: {

        useMutation: <T extends Prisma.CartCreateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.CartCreateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.CartCreateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.CartCreateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    create: {

        useMutation: <T extends Prisma.CartCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.CartCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.CartGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.CartGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.CartCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.CartCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.CartGetPayload<T>, Context>) => Promise<Prisma.CartGetPayload<T>>
            };

    };
    deleteMany: {

        useMutation: <T extends Prisma.CartDeleteManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.CartDeleteManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.CartDeleteManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.CartDeleteManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    delete: {

        useMutation: <T extends Prisma.CartDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.CartDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.CartGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.CartGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.CartDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.CartDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.CartGetPayload<T>, Context>) => Promise<Prisma.CartGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.CartFindFirstArgs, TData = Prisma.CartGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.CartFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.CartGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.CartFindFirstArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.CartFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.CartGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.CartGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.CartFindManyArgs, TData = Array<Prisma.CartGetPayload<T>>>(
            input: Prisma.SelectSubset<T, Prisma.CartFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.CartGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.CartFindManyArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.CartFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.CartGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.CartGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.CartFindUniqueArgs, TData = Prisma.CartGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.CartFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.CartGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.CartFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.CartFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.CartGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.CartGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    updateMany: {

        useMutation: <T extends Prisma.CartUpdateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.CartUpdateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.CartUpdateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.CartUpdateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    update: {

        useMutation: <T extends Prisma.CartUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.CartUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.CartGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.CartGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.CartUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.CartUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.CartGetPayload<T>, Context>) => Promise<Prisma.CartGetPayload<T>>
            };

    };
}

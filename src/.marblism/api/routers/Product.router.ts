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

        createMany: procedure.input($Schema.ProductInputSchema.createMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).product.createMany(input as any))),

        create: procedure.input($Schema.ProductInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).product.create(input as any))),

        deleteMany: procedure.input($Schema.ProductInputSchema.deleteMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).product.deleteMany(input as any))),

        delete: procedure.input($Schema.ProductInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).product.delete(input as any))),

        findFirst: procedure.input($Schema.ProductInputSchema.findFirst).query(({ ctx, input }) => checkRead(db(ctx).product.findFirst(input as any))),

        findMany: procedure.input($Schema.ProductInputSchema.findMany).query(({ ctx, input }) => checkRead(db(ctx).product.findMany(input as any))),

        findUnique: procedure.input($Schema.ProductInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).product.findUnique(input as any))),

        updateMany: procedure.input($Schema.ProductInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).product.updateMany(input as any))),

        update: procedure.input($Schema.ProductInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).product.update(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    createMany: {

        useMutation: <T extends Prisma.ProductCreateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.ProductCreateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.ProductCreateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.ProductCreateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    create: {

        useMutation: <T extends Prisma.ProductCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.ProductCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.ProductGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.ProductGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.ProductCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.ProductCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.ProductGetPayload<T>, Context>) => Promise<Prisma.ProductGetPayload<T>>
            };

    };
    deleteMany: {

        useMutation: <T extends Prisma.ProductDeleteManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.ProductDeleteManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.ProductDeleteManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.ProductDeleteManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    delete: {

        useMutation: <T extends Prisma.ProductDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.ProductDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.ProductGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.ProductGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.ProductDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.ProductDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.ProductGetPayload<T>, Context>) => Promise<Prisma.ProductGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.ProductFindFirstArgs, TData = Prisma.ProductGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.ProductFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.ProductGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.ProductFindFirstArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.ProductFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.ProductGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.ProductGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.ProductFindManyArgs, TData = Array<Prisma.ProductGetPayload<T>>>(
            input: Prisma.SelectSubset<T, Prisma.ProductFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.ProductGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.ProductFindManyArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.ProductFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.ProductGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.ProductGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.ProductFindUniqueArgs, TData = Prisma.ProductGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.ProductFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.ProductGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.ProductFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.ProductFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.ProductGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.ProductGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    updateMany: {

        useMutation: <T extends Prisma.ProductUpdateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.ProductUpdateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.ProductUpdateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.ProductUpdateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    update: {

        useMutation: <T extends Prisma.ProductUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.ProductUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.ProductGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.ProductGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.ProductUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.ProductUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.ProductGetPayload<T>, Context>) => Promise<Prisma.ProductGetPayload<T>>
            };

    };
}

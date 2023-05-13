import { MODEL_NAME } from "constants/db";
import { db } from './models';
import { Document, RootQuerySelector, PipelineStage, Model } from 'mongoose';

import { ObjectValue } from 'types/helpers'
type TCollectionNames = ObjectValue<typeof MODEL_NAME>;

import { TypeDocuments as TDoc, ICredential } from "types/mongodb";
import dbConnect from '@/utils/mongooseConnect';
import { ArrType } from '@/helpers/database';

type DefaultAggregate = {[key: string]: unknown[]};
type TReturnJsonOfMongodb<M extends TCollectionNames, T extends TDoc[M], A extends DefaultAggregate | undefined> = A extends undefined ? T & ICredential & Document : A & T & ICredential & Document;

import { Pagination } from '@/types/table';
import { NoInfer } from "xstate";

export default class DocumentDbCaretaker<M extends TCollectionNames, TAggregate extends DefaultAggregate | undefined = undefined> {
    private _modelName: M;
    
    private _docs = ArrType<(TDoc[M])>()
    private _sort: {
        [key: string]: 1 | -1
    } = {};
    private _docsCredential = ArrType<TReturnJsonOfMongodb<M, (TDoc[M]), TAggregate>>();
    // private _query: Partial<TReturnJsonOfMongodb<M, (TDoc[M])>> = {};
    private _query: RootQuerySelector<TReturnJsonOfMongodb<M, (TDoc[M]), TAggregate>> = {};
    private _count: number = 0;
    private _pagination: Pagination | null = null;

    constructor({ modelName }: { modelName: M}){
        this._modelName = modelName;
        dbConnect().then();
        this.reset();
    }
    private reset(): void {
        this._docs =  ArrType<(TDoc[M])>();
        this._docsCredential =  ArrType<TReturnJsonOfMongodb<M, (TDoc[M]), TAggregate>>();
        this._query = {};
    }

    public setDocument(document: TDoc[M] | (TDoc[M])[]): this {
        this.reset();
        if(Array.isArray(document)){
            this._docs = document;
        } else {
            this._docs[0] = document;
        }
        return this;
    }

    public setPaginate({ page, limit }: { page: number, limit: number }): this {
        this._pagination = {
            new: {page, limit},
            startIndex: (page - 1) * limit,
            endIndex: page * limit
        };
        return this;
    }
    public setSort(sort: string) {
        console.log(sort);
        sort.split(',').map((item) => {
            if(item !== '') {
                const [key, value] = item.split(':');
                this._sort[key] = value == 'desc' ? -1 : 1;
            }
        })
        return this;
    }
    get pagination() {
        return {
            ...this._pagination,
            total: this._count,
        }
    }

    get document(): TReturnJsonOfMongodb<M, (TDoc[M]), TAggregate> {
        return this._docsCredential[0];
    }
    get documents(): TReturnJsonOfMongodb<M, (TDoc[M]), TAggregate>[] {
        return this._docsCredential;
    }


    public setQuery(query: RootQuerySelector<TReturnJsonOfMongodb<M, (TDoc[M]), TAggregate>>) : this {
        if(!query) return this;
        this._query = query;
        return this;
    }

    get count() {
        return this._count;
    }

    
    
    public async insertDocument(): Promise<this> {
        if(!this._docs || this._docs.length == 0){
            throw new Error("Document don't exist")
        }
        try{
            if(this._docs.length == 1) {
                const doc = await db[this._modelName].create<TDoc[M]>(this._docs[0]);
                this._docsCredential = [...this._docsCredential,{...doc.toObject()}];
            }else{
                const docs = await db[this._modelName].insertMany(this._docs);
                const docsDestroyed = docs.map((doc) => ({...doc.toObject()}));
                this._docsCredential = [...this._docsCredential, ...docsDestroyed]
            }
        }catch(err){
            console.log(err);
            throw new Error('Error inset document');
        }
        return this;
    }
    public async updateDocument(updated: Partial<TDoc[M]>): Promise<this> {
        try {
            if(!this._query) throw new Error('Error update document');
            await db[this._modelName].updateMany({ ...this._query }, updated);
        } catch (err) {
            console.log("Error updating document: ", err);
            throw new Error("Error updating document");
        }
        return this;
    }
    
    public async deleteDocument(): Promise<this> {
        try {
            // @ts-ignore
            await db[this._modelName].deleteMany({ ...this._query });
        } catch (err) {
            console.log("Error deleting document: ", err);
            throw new Error("Error deleting document");
        }
        return this;
    }

    public async getDocuments() {
        if(!this._query) throw new Error('Please set the query to get your document file')
        try {
            let res: any[] = [];
            if(!this._pagination) {
                res = await db[this._modelName].find({ ...this._query }).exec();
            }else {
                this._count = await db[this._modelName].countDocuments({ ...this._query }).exec();

                if(this._pagination.endIndex < this._count) {
                    this._pagination.next = {
                        page: this._pagination.new.page + 1,
                        limit: this._pagination.new.limit,
                    }
                }
                if(this._pagination.startIndex > 0) {
                    this._pagination.previous = {
                        page: this._pagination.new.page - 1,
                        limit: this._pagination.new.limit,
                    }
                }
                res = await db[this._modelName].find({ ...this._query })
                    .skip(this._pagination.startIndex)
                    .limit(this._pagination.new.limit).sort(this._sort).exec();
            }
            this._docsCredential = res.map<TReturnJsonOfMongodb<M, (TDoc[M]), TAggregate>>((doc: any) => ({...doc.toObject()}));
        } catch (err) {
            console.log("Error performing aggregate: ", err);
            throw new Error("Error performing aggregate");
        }
        return this;
    }
    public async aggregate(pipeline: PipelineStage[] = []): Promise<this> {
        try {
            const docs = (await db[this._modelName].aggregate(pipeline))
            this._docsCredential = docs;
        } catch (err) {
            console.log("Error performing aggregate: ", err);
            throw new Error("Error performing aggregate");
        }
        return this;
    }

    public async countDocuments(): Promise<this> {
        try {
            // @ts-ignore
            this._count = await db[this._modelName].countDocuments({ ...this._query });
        } catch (err) {
            console.log("error counting documents", err);
            throw new Error('error counting documents');
        }
        return this;
    }
} 
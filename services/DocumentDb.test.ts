import mongooseConnection from '../utils/mongooseConnect';
import mongoose from 'mongoose';
import { TypeDocuments as TDoc } from '../types/mongodb';

import { MODEL_NAME, STATE_USER_ROLE, GENDER } from "../constants/db";
const USER_MODEL = MODEL_NAME.USER;
import DocumentDbCaretaker from './DocumentDb';

const userData: TDoc[typeof MODEL_NAME.USER]  = {
    first_name: "John",
    last_name: "Doe",
    email: "johndoe@example.com",
    password: "password123",
    statusUserRole: [STATE_USER_ROLE.VISITOR],
    img: undefined,
    gender: GENDER.MAN,
    cin: "12345678",
    address: "123 Main Street"
  };

describe('Database Testing', () => {
    // let db: typeof mongooseConnection;

    // beforeAll(async () => {
    //     db = await mongooseConnection();
    // });

    // it('Should connect to the database', () => {
    //     expect(db).toBeDefined();
    // });


    describe('Test DocumentDb', () => {
        let caretaker: DocumentDbCaretaker<typeof MODEL_NAME.USER>;
        const modelName = MODEL_NAME.USER;
        const doc: TDoc[typeof MODEL_NAME.USER] = userData;
        beforeEach(() => {
            caretaker = new DocumentDbCaretaker({ modelName });
        });
        
        it('should insert a document', async () => {
            caretaker.setDocument(doc);
            await (await caretaker.insertDocument()).setQuery({ last_name: doc.last_name });
            
            const result = (await caretaker.getDocuments()).document;
            expect(result).toBeDefined();
            expect(result?.last_name).toBe(doc.last_name);
        });

        afterEach(async () => {

        });
    })
    afterAll(async () => {
        await mongoose.disconnect();
    });
});
import { z } from 'zod';
const regExpText = new RegExp("^[a-zA-Z0-9,.;:-_'\\s]+$");
const regExpUuid = new RegExp("^[0-9a-fA-F]{8}\\b-[0-9a-fA-F]{4}\\b-[0-9a-fA-F]{4}\\b-[0-9a-fA-F]{4}\\b-[0-9a-fA-F]{12}$"); 

const taskSchemaCreate = z.object({
  id: z.optional(z.string().regex(regExpUuid, { message: 'Id is not valid' })),
  title: z.string({
    invalid_type_error: 'Title must be a string',
    required_error: 'Title is required'
  }).min(5).max(128, { message: 'Title is max 128 length' }).regex(regExpText, { message: 'Title is not valid' }),
  description: z.string().max(256, { message: 'Description is max 256 length' }).regex(regExpText, { message: 'Description is not valid' }).optional(),
});

const taskSchemaRead = z.object({
  id: z.string({required_error: 'Id is required'}).regex(regExpUuid, { message: 'Id is not valid' }),
});

const taskSchemaUpdate = z.object({
  id: z.string({required_error: 'Id is required'}).regex(regExpUuid, { message: 'Id is not valid' }),
  title: z.string().min(5).max(128, { message: 'Title is max 128 length' }).regex(regExpText, { message: 'Title is not valid' }).optional(),
  description: z.string().max(256, { message: 'Description is max 256 length' }).regex(regExpText, { message: 'Description is not valid' }).optional(),
  done: z.boolean().optional(),
});
const taskSchemaDelete = z.object({
  id: z.string({required_error: 'Id is required'}).regex(regExpUuid, { message: 'Id is not valid' }),
});

export const validateTask = async (object, typeOp) => {
  switch (typeOp) {
    case 'C': return taskSchemaCreate.safeParse(object);
    case 'R': return taskSchemaRead.safeParse(object);
    case 'U': return taskSchemaUpdate.safeParse(object);
    case 'D': return taskSchemaDelete.safeParse(object);
  }
}

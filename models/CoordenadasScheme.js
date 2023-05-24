import { Schema, model } from 'mongoose';

const CoordenadasSchema = Schema(
  {
    x: {
      type: Number,
      required: true,
    },
    y: {
      type: Number,
      required: true,
    },
    Pedido_id: {
      type: Number,
      required: true,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

CoordenadasSchema.virtual('tareas', {
  ref: 'Task',
  localField: 'id',
  foreignField: 'user',
  justOne: false,
});

module.exports = model('Coordenadas',CoordenadasSchema);
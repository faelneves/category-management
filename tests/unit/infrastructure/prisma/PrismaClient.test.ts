import { PrismaClient } from '@prisma/client';
import prismaInstance from '../../../../src/infrastructure/prisma/PrismaClient';

jest.mock('@prisma/client', () => {
  return {
    PrismaClient: jest.fn().mockImplementation(() => {
      return {
        $connect: jest.fn(),
      };
    }),
  };
});

describe('prismaInstance', () => {
  it('should call Prisma connect function', async () => {
    await prismaInstance.$connect();

    expect(PrismaClient).toHaveBeenCalledTimes(1);
    expect(prismaInstance.$connect).toHaveBeenCalled();
  });
});

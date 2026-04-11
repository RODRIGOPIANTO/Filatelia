/**
 * @jest-environment node
 * Integration tests for POST /api/auth/register
 */
import { POST } from '@/app/api/auth/register/route'
import { NextRequest } from 'next/server'

// Mock Prisma and bcryptjs
jest.mock('@/lib/db/prisma', () => ({
  prisma: {
    user: {
      findFirst: jest.fn(),
      create:    jest.fn(),
    },
  },
}))

jest.mock('bcryptjs', () => ({
  hash: jest.fn().mockResolvedValue('$hashed$password'),
}))

import { prisma } from '@/lib/db/prisma'
const mockPrisma = prisma as jest.Mocked<typeof prisma>

const makeRequest = (body: object) =>
  new NextRequest('http://localhost:3000/api/auth/register', {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
  })

const VALID_BODY = {
  fullName: 'Juan Pérez',
  email: 'juan@test.com',
  username: 'juanperez',
  password: 'Password123!',
  countryCode: 'PE',
}

beforeEach(() => {
  jest.clearAllMocks()
  ;(mockPrisma.user.findFirst as jest.Mock).mockResolvedValue(null)
  ;(mockPrisma.user.create as jest.Mock).mockResolvedValue({
    id: 'usr_1', fullName: 'Juan Pérez', email: 'juan@test.com', username: 'juanperez', createdAt: new Date(),
  })
})

describe('POST /api/auth/register', () => {
  it('creates a user successfully and returns 201', async () => {
    const res = await POST(makeRequest(VALID_BODY))
    expect(res.status).toBe(201)
    const body = await res.json()
    expect(body.data).toHaveProperty('id')
    expect(body.data.email).toBe('juan@test.com')
  })

  it('returns 409 when email already exists', async () => {
    ;(mockPrisma.user.findFirst as jest.Mock).mockResolvedValue({ email: 'juan@test.com', username: 'juan' })
    const res = await POST(makeRequest(VALID_BODY))
    expect(res.status).toBe(409)
    const body = await res.json()
    expect(body.error).toMatch(/email/)
  })

  it('returns 422 on invalid email', async () => {
    const res = await POST(makeRequest({ ...VALID_BODY, email: 'not-an-email' }))
    expect(res.status).toBe(422)
  })

  it('returns 422 when password is too short', async () => {
    const res = await POST(makeRequest({ ...VALID_BODY, password: 'short' }))
    expect(res.status).toBe(422)
  })

  it('returns 422 when username has invalid chars', async () => {
    const res = await POST(makeRequest({ ...VALID_BODY, username: 'Juan Pérez!' }))
    expect(res.status).toBe(422)
  })

  it('returns 422 when required fields are missing', async () => {
    const res = await POST(makeRequest({ email: 'juan@test.com' }))
    expect(res.status).toBe(422)
  })
})

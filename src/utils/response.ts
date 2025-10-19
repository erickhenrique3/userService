import { Context } from 'koa'

export function success(ctx: Context, data: any, message = 'Success', status = 200) {
  ctx.status = status
  ctx.body = { status: 'success', message, data }
}

export function error(ctx: Context, message = 'Something went wrong', status = 400, details?: any) {
  ctx.status = status
  ctx.body = { status: 'error', message, details }
}

export function notFound(ctx: Context, message = 'Not found') {
  ctx.status = 404
  ctx.body = { status: 'error', message}
}
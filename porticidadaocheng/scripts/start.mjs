import { spawn } from 'node:child_process'

const port = process.env.PORT || '3333'
const host = process.env.HOST || '0.0.0.0'

const child = spawn('sanity', ['start', '--host', host, '--port', port], {
  stdio: 'inherit',
  shell: true,
})

child.on('exit', (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal)
    return
  }
  process.exit(code ?? 0)
})

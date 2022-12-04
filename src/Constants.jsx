import { Vector3 } from 'three'

export const Gravity = 30
export const ballCount = 100
export const radius = 0.2
export const balls = [...Array(ballCount)].map(() => ({ position: [Math.random() * 50 - 25, 20, Math.random() * 50 - 25] }))
export const v1 = new Vector3()
export const v2 = new Vector3()
export const v3 = new Vector3()
export const frameSteps = 5

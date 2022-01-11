import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
    'https://tywcrgbkkirnmjmtooqm.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MTQwNzAyMywiZXhwIjoxOTU2OTgzMDIzfQ.ZFiW2d2jQMTwZPBkH0yFutLw29v7_boTI3ch20DqS-Q'
)
import React from 'react';

function DreamForm () {
    return (
        <div>
            <form>
                <label htmlFor='name'>Title or Date</label>
                <input type='text' id='name' name='name' />

                <label htmlFor='dreamNote'>Dream Note</label>
                <input type='text' id='dreamNote' name='dreamNote' />

                <label htmlFor='type'>Type or Category other</label>
                <input type='text' id='type' name='type' />

                <button>Submit</button>
            </form>
        </div>
    )
}



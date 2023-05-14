
function LeftAside() {
  return (
    <div>
        <div>
            <div>
                <div>
                    <div>Origin</div>
                        <input type="text" />
                </div>
                <div>
                    <div>Stop</div>
                        <input type="text" />
                    <button>+ Add another stop</button>
                </div>
                <div>
                    <div>Destination</div>
                        <input type="text" />
                </div>
            </div>

            <div>
                <button>Calculate</button>
            </div>
        </div>

        

        <div>
            <div>
                <div>Distance</div>
                <div>1,427 kms</div>
            </div>
            <div>The distance between Mumbai and Delhi via the seleted route is 1,427 kms.</div>
        </div>
    </div>
  )
}

export default LeftAside
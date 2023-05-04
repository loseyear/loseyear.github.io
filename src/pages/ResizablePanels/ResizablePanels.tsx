// src/pages/ResizablePanelsPage/ResizablePanelsPage.tsx

import React, { useState } from 'react'
import { Panel, PanelGroup } from 'react-resizable-panels'

import useStyles from './style'
import ResizeHandle from './ResizeHandle'

export default function App() {
  const s = useStyles()
  const [showFirstPanel, setShowFirstPanel] = useState(true)
  const [showLastPanel, setShowLastPanel] = useState(true)

  return (
    <div className={s.Container}>
      <div className={s.TopRow}>
        <p>
          <button
            className={s.Button}
            onClick={() => setShowFirstPanel(!showFirstPanel)}
          >
            {showFirstPanel ? 'hide' : 'show'} top panel
          </button>
          &nbsp;
          <button
            className={s.Button}
            onClick={() => setShowLastPanel(!showLastPanel)}
          >
            {showLastPanel ? 'hide' : 'show'} bottom panel
          </button>
        </p>
      </div>
      <div className={s.BottomRow}>
        <PanelGroup autoSaveId="example" direction="vertical">
          {showFirstPanel && (
            <>
              <Panel
                className={s.Panel}
                collapsible={true}
                defaultSize={20}
                order={1}
              >
                <div className={s.PanelContent}>top</div>
              </Panel>
              <ResizeHandle />
            </>
          )}
          <Panel className={s.Panel} collapsible={true} order={2}>
            <div className={s.PanelContent}>middle</div>
          </Panel>
          {showLastPanel && (
            <>
              <ResizeHandle />
              <Panel
                className={s.Panel}
                collapsible={true}
                defaultSize={20}
                order={3}
              >
                <div className={s.PanelContent}>bottom</div>
              </Panel>
            </>
          )}
        </PanelGroup>
      </div>
    </div>
  )
}

